use std::fs;
use std::process::Command;
use rand::Rng;

pub fn mutate_and_test() {
    let original = fs::read_to_string("src/main.rs").expect("فشل قراءة الكود الأصلي");
    let mut mutated = original.clone();
    
    // إضافة طفرة عشوائية (تعليق)
    let mut rng = rand::thread_rng();
    let pos = rng.gen_range(0..mutated.len().min(100)); 
    mutated.insert_str(pos, "// mutation\n");
    
    fs::write("src/main.rs", mutated).expect("فشل كتابة الطفرة");
    
    // الانتخاب الطبيعي (التحقق من صحة الكود)
    let status = Command::new("cargo").arg("check").status().expect("فشل استدعاء cargo");
    
    if !status.success() {
        println!(">> الطفرة فشلت (ماتت)، تراجع إلى الكود الأصلي...");
        fs::write("src/main.rs", original).expect("فشل استعادة الأصل");
    } else {
        println!(">> الطفرة نجحت! الكود تطور وتكيف.");
    }
}
