import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { UsermSol } from "../target/types/userm_sol";

describe("userm-sol", () => {
  // provider shit
  let provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);

  // for userlist account and signing
  let user_siger = anchor.web3.Keypair.generate();

  const program = anchor.workspace.UsermSol as Program<UsermSol>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
      .initialize()
      .accounts({
        userlist: user_siger.publicKey,
      })
      .signers([user_siger])
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Stores User value!", async () => {
    // Add your test here.
    const tx = await program.methods
      .setUser("Chirag", "Jani")
      .accounts({
        userlist: user_siger.publicKey,
      })
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Stores Another User value!", async () => {
    // Add your test here.
    const tx = await program.methods
      .setUser("Rashid", "Khan")
      .accounts({
        userlist: user_siger.publicKey,
      })
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Gets All Users!", async () => {
    // not good as directly reading variable
    let data = await program.account.users.fetch(user_siger.publicKey);
    console.log("Userdata: ", data);
  });

  it("Gets One User!", async () => {
    let tx = await program.methods
      .getOneUser("Chirag", "Jani")
      .accounts({
        userlist: user_siger.publicKey,
      })
      .simulate()
      .then((d) => {
        console.log("Return data", d);
      });
  });
});
