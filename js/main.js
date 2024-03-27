const currentYear = new Date().getFullYear();
document.getElementById("year").innerText = currentYear;
document.getElementById("year1").innerText = currentYear;
let text =
  "আমরা টেবিল খেলা প্রেমিক এবং তাদের গুরুত্ব সম্পর্কে সামান্য বোঝাতে চাই। আমাদের লক্ষ্য হ'ল টেবিল খেলা সবার জন্য উপলব্ধ করা, বয়স, আগ্রহ বা খেলার অভিজ্ঞতা উপেক্ষা করে। আমরা সামাজিক যৌথভাবে খেলার শক্তি বিশ্বাস করি, যা পরিবার, বন্ধু এবং সহযোগীদের সংযোগ করে এবং উদ্যোগের উপর নির্ভর করে। আমরা বিশ্বের সেরা টেবিল খেলা প্রদান করার জন্য প্রয়াস করি, যা সামগ্রিক মজার অভিজ্ঞতা এবং নিখুত মুহূর্ত তৈরি করে। আমরা আমাদের গ্রাহকদের সন্তুষ্টির জন্য উন্নতির উপর ছানা করি এবং সর্বদা দায়িত্বশীল";

let normalizedText = text.normalize("NFC");
document.getElementById("changeText").innerText = normalizedText;
