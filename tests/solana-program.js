const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

describe("alice-vs-bob", () => {
  /* Configure the client */
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.SolanaProgram;
  const voteAccount = anchor.web3.Keypair.generate();

  it("Initializes votes", async () => {
    console.log("Testing Initialize...");
    
    await program.rpc.initialize({
      accounts: {
        voteAccount: voteAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [voteAccount],
    });
    const account = await program.account.voteAccount.fetch(
      voteAccount.publicKey
    );
    console.log("Alice: ", account.alice.toString());
    console.log("Bob: ", account.bob.toString());
    assert.ok(
      account.alice.toString() == 0 && account.bob.toString() == 0
    );
  });
  it("Votes correctly for alice", async () => {
    console.log("Testing vote Alice...");
    await program.rpc.voteAlice({
      accounts: {
        voteAccount: voteAccount.publicKey,
      },
    });
    const account = await program.account.voteAccount.fetch(
      voteAccount.publicKey
    );
    console.log("Alice: ", account.alice.toString());
    console.log("Bob: ", account.bob.toString());
    assert.ok(
      account.alice.toString() == 1 && account.bob.toString() == 0
    );
  });
  it("Votes correctly for bob", async () => {
    console.log("Testing vote Bob...");
    await program.rpc.voteBob({
      accounts: {
        voteAccount: voteAccount.publicKey,
      },
    });
    const account = await program.account.voteAccount.fetch(
      voteAccount.publicKey
    );
    console.log("Alice: ", account.alice.toString());
    console.log("Bob: ", account.bob.toString());
    assert.ok(
      account.alice.toString() == 1 && account.bob.toString() == 1
    );
  });
});