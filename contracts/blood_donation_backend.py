# Blood Donation Backend (Algorand ASC1)
# PyTeal smart contract for registering donors and recording donations

from pyteal import *

def approval_program():
    handle_creation = Seq([
        App.globalPut(Bytes("TotalDonations"), Int(0)),
        Approve()
    ])

    handle_optin = Approve()

    handle_noop = Cond(
        [Txn.application_args[0] == Bytes("registerDonor"), Approve()],
        [Txn.application_args[0] == Bytes("recordDonation"),
            Seq([
                App.globalPut(Bytes("TotalDonations"), App.globalGet(Bytes("TotalDonations")) + Int(1)),
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
    with open('blood_donation_backend_approval.teal', 'w') as f:
        compiled = compileTeal(approval_program(), mode=Mode.Application, version=5)
        f.write(compiled)
    with open('blood_donation_backend_clear.teal', 'w') as f:
        compiled = compileTeal(clear_state_program(), mode=Mode.Application, version=5)
        f.write(compiled)
