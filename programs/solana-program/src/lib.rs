use anchor_lang::prelude::*;

declare_id!("aYCFmDitW6N7y6B5TgDpBqbiY1jeNuCAq6tuDP7EEw5");

#[program]
pub mod solana_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result <()> {
        let vote_account = &mut ctx.accounts.vote_account;
        vote_account.bob = 0;
        vote_account.alice = 0;
        Ok(())
    }

    pub fn vote_alice(ctx: Context<Vote>) -> Result <()> {
        let vote_account = &mut ctx.accounts.vote_account;
        vote_account.alice += 1;
        Ok(())
    }
    
    pub fn vote_bob(ctx: Context<Vote>) -> Result <()> {
        let vote_account = &mut ctx.accounts.vote_account;
        vote_account.bob += 1;
        Ok(())
    }
    
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 16 + 16)]
    pub vote_account: Account<'info, VoteAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program <'info, System>,
}
#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(mut)]
    pub vote_account: Account<'info, VoteAccount>,
}

#[account]
pub struct VoteAccount {
    pub bob: u64,
    pub alice: u64,
}