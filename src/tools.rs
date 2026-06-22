use anyhow::Result;
use async_trait::async_trait;
use reqwest::Client;
use std::env;

#[async_trait]
pub trait Tool: Send + Sync {
    fn name(&self) -> String;
    async fn execute(&self, args: Vec<String>) -> Result<String>;
}

pub struct GitHubTool { client: Client }

impl GitHubTool {
    pub fn new() -> Self { Self { client: Client::new() } }
}

#[async_trait]
impl Tool for GitHubTool {
    fn name(&self) -> String { "github_api".to_string() }
    async fn execute(&self, _args: Vec<String>) -> Result<String> {
        let token = env::var("GITHUB_TOKEN").expect("GITHUB_TOKEN must be set");
        let res = self.client.get("https://api.github.com/user")
            .header("Authorization", format!("token {}", token))
            .header("User-Agent", "Maleka-Omega-Agent")
            .send()
            .await?
            .text()
            .await?;
        Ok(res)
    }
}
