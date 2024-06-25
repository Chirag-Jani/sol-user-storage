use anchor_lang::prelude::*;

declare_id!("3ewiot3qMxAsLksj7eJnVsAesbLUk32JGuY74DgU7DTR");

#[derive(AnchorDeserialize, AnchorSerialize, Clone)]
pub struct UserInfo {
    username: String,
    password: String,
}

#[account]
pub struct Users {
    all_users: Vec<UserInfo>,
}

impl Users {
    pub const SIZE: usize = 8 + (4 + 24 + 24) * 100;
}

#[derive(Accounts)]
pub struct Register<'info> {
    #[account(mut)]
    userlist: Account<'info, Users>,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = deployer, space = Users::SIZE)]
    userlist: Account<'info, Users>,
    #[account(mut)]
    deployer: Signer<'info>,
    system_program: Program<'info, System>,
}

#[program]
pub mod userm_sol {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let userlist = &mut ctx.accounts.userlist;

        userlist.all_users = Vec::new();

        Ok(())
    }

    pub fn get_all_users(ctx: Context<Register>) -> Result<Vec<UserInfo>> {
        let userlist = &ctx.accounts.userlist;

        Ok(userlist.all_users.clone())
    }

    pub fn set_user(ctx: Context<Register>, username: String, password: String) -> Result<()> {
        let userlist = &mut ctx.accounts.userlist;

        let new_user = UserInfo { username, password };

        userlist.all_users.push(new_user);

        Ok(())
    }

    pub fn get_one_user(
        ctx: Context<Register>,
        username: String,
        password: String,
    ) -> Result<Option<UserInfo>> {
        let all_users = &ctx.accounts.userlist.all_users;

        let length = all_users.clone().len();

        for i in 0..length {
            if all_users[i].username == username && all_users[i].password == password {
                return Ok(Some(all_users[i].clone()));
            }
        }

        Ok(None)
    }
}
