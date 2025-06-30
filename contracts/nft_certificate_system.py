# NFT Certificate System (Algorand ASA)
# PyTeal smart contract for minting NFT certificates for donations

from pyteal import *

def approval_program():
    handle_creation = Seq([
        App.globalPut(Bytes("TotalCertificates"), Int(0)),
        Approve()
    ])

    handle_optin = Approve()

    handle_noop = Cond(
        [Txn.application_args[0] == Bytes("mintDonationCertificate"),
            Seq([
                App.globalPut(Bytes("TotalCertificates"), App.globalGet(Bytes("TotalCertificates")) + Int(1)),
                Approve()
            ])
        ]
    )

    program = Cond(
        [Txn.application_id() == Int(0), handle_creation],
        [Txn.on_completion() == OnComplete.OptIn, handle_optin],
        [Txn.on_completion() == OnComplete.NoOp, handle_noop]
    )
    return program

def clear_state_program():
    return Approve()

if __name__ == "__main__":
    with open('nft_certificate_system_approval.teal', 'w') as f:
        compiled = compileTeal(approval_program(), mode=Mode.Application, version=5)
        f.write(compiled)
    with open('nft_certificate_system_clear.teal', 'w') as f:
        compiled = compileTeal(clear_state_program(), mode=Mode.Application, version=5)
        f.write(compiled)
