pub struct IdentityKernel {
    pub name: String,
}
impl IdentityKernel {
    pub fn new() -> Self { Self { name: "MALEKA Ω".to_string() } }
    pub fn validate_action(&self, action: &str) -> bool { !action.is_empty() }
}
