pub fn readme(name: &str) -> String {
    format!("# {}\n\nهذا المشروع تم إنشاؤه بواسطة MALEKA Ω.\n\n### الوصف\nنظام مستقل ذاتي التطور.\n", name)
}

pub fn main_rs(name: &str) -> String {
    format!(
        "fn main() {{\n    println!(\"تم تشغيل مشروع: {}\");\n    // MALEKA Ω: ابدأ الابتكار هنا.\n}}",
        name
    )
}
