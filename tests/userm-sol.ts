import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { UsermSol } from "../target/types/userm_sol";

describe("userm-sol", () => {
  // Configure the client to use the local cluster.
  let provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);

  let user_siger = anchor.web3.Keypair.generate();

  const program = anchor.workspace.UsermSol as Program<UsermSol>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
      .initialize()
      .accounts({
        userlist: user_siger.publicKey,
        deployer: provider.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([user_siger, provider.wallet.payer])
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Stores User value!", async () => {
    // Add your test here.
    const tx = await program.methods
      .setUser("Chirag", "Jani")
      .accounts({
        userlist: user_siger.publicKey,
        deployer: provider.publicKey,
      })
      .signers([provider.wallet.payer])
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Stores Another User value!", async () => {
    // Add your test here.
    const tx = await program.methods
      .setUser("Rashid", "Khan")
      .accounts({
        userlist: user_siger.publicKey,
        deployer: provider.publicKey,
      })
      .signers([provider.wallet.payer])
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Gets All Users!", async () => {
    // Add your test here.
    const tx = await program.methods
      .getAllUsers()
      .accounts({
        userlist: user_siger.publicKey,
        deployer: provider.publicKey,
      })
      .signers([provider.wallet.payer])
      .rpc();
    console.log("Your transaction signature", tx);

    let data = await program.account.users.fetch(user_siger.publicKey);
    console.log("Userdata: ", data);
  });

  it("Gets One User!", async () => {
    let tx = await program.methods
      .getOneUser("Chirag", "Jani")
      .accounts({
        userlist: user_siger.publicKey,
        deployer: provider.publicKey,
      })
      .signers([provider.wallet.payer])
      .simulate()
      .then((d) => {
        console.log("Return data", d);
      });
  });
});
