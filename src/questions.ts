import { Question } from './types';

export const QUESTIONS: Question[] = [
  // ==================== CHẶNG 1: NHANH NHƯ CHỚP (Q1 - Q15) ====================
  {
    id: 1,
    stage: 1,
    question: "Công thức chung của ester no, đơn chức, mạch hở là gì?",
    options: [
      "CnH2n+2O2 (n >= 1)",
      "CnH2nO2 (n >= 2)",
      "CnH2n-2O2 (n >= 3)",
      "CnH2nO (n >= 2)"
    ],
    answer: 1,
    explanation: "Ester no, đơn chức, mạch hở được tạo thành từ acid carboxylic no, đơn chức, mạch hở và alcohol no, đơn chức, mạch hở có công thức chung là CnH2nO2 với điều kiện số nguyên tử carbon n >= 2."
  },
  {
    id: 2,
    stage: 1,
    question: "Hợp chất nào sau đây thuộc loại hợp chất ester?",
    options: [
      "CH3COOH",
      "CH3COOCH3",
      "CH3COCH3",
      "CH3CH2OH"
    ],
    answer: 1,
    explanation: "CH3COOH là carboxylic acid, CH3COCH3 là ketone, CH3CH2OH là alcohol. Chỉ có CH3COOC­H3 có chứa nhóm chức ester (-COO-)."
  },
  {
    id: 3,
    stage: 1,
    question: "Hợp chất nào dưới đây là một ester no, đơn chức, mạch hở tiêu biểu?",
    options: [
      "CH2=CHCOOCH3",
      "HCOOCH3",
      "C6H5COOCH3",
      "CH3COOC6H5"
    ],
    answer: 1,
    explanation: "HCOOCH3 (methyl formate) chứa gốc hydrocarbon no và chức ester đơn chức mạch hở, công thức là C2H4O2, ứng với dạng CnH2nO2."
  },
  {
    id: 4,
    stage: 1,
    question: "Công thức chung của ester không no, đơn chức, mạch hở có chứa 1 liên kết đôi C=C là:",
    options: [
      "CnH2nO2 (n >= 2)",
      "CnH2n-2O2 (n >= 3)",
      "CnH2n-4O2 (n >= 4)",
      "CnH2n+2O2 (n >= 3)"
    ],
    answer: 1,
    explanation: "Khi có thêm 1 liên kết đôi C=C, độ bất bão hòa k tăng thêm 1 (k = 2), vậy công thức thu được là CnH2n-2O2 với n >= 3."
  },
  {
    id: 5,
    stage: 1,
    question: "Một ester đơn chức có phân tử khối bằng 60 (M = 60). Công thức phân tử của ester đó là:",
    options: [
      "C3H6O2",
      "C2H4O2",
      "C4H8O2",
      "CH2O2"
    ],
    answer: 1,
    explanation: "Ester đơn chức có công thức CnH2nX2O2. Phân tử khối: 14n + 32 = 60 => 14n = 28 => n = 2. Vậy công thức là C2H4O2 (chỉ có duy nhất ester là HCOOCH3)."
  },
  {
    id: 6,
    stage: 1,
    question: "Hợp chất hữu cơ no, mạch hở có công thức phân tử C3H6O2 có những đồng phân đơn chức thuộc loại chất nào?",
    options: [
      "Carboxylic acid và Alcohol",
      "Ester và Aldehyde",
      "Carboxylic acid và Ester",
      "Ketone và Alcohol"
    ],
    answer: 2,
    explanation: "Với C3H6O2, các đồng phân đơn chức có thể là Carboxylic acid (C2H5COOH) hoặc Ester (HCOOC2H5, CH3COOCH3)."
  },
  {
    id: 7,
    stage: 1,
    question: "Số đồng phân ester ứng với công thức phân tử C3H6O2 là bao nhiêu?",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    answer: 1,
    explanation: "C3H6O2 có 2 đồng phân ester là: HCOOCH2CH3 (ethyl formate) và CH3COOCH3 (methyl acetate)."
  },
  {
    id: 8,
    stage: 1,
    question: "Số hợp chất hữu cơ đơn chức, tác dụng được với dung dịch NaOH có công thức phân tử C3H6O2 là:",
    options: [
      "2",
      "3",
      "4",
      "1"
    ],
    answer: 1,
    explanation: "Hợp chất đơn chức tác dụng được với NaOH gồm carboxylic acid (C2H5COOH - 1 đồng phân) và các ester (HCOOC2H5, CH3COOCH3 - 2 đồng phân). Tổng cộng có 3 đồng phân."
  },
  {
    id: 9,
    stage: 1,
    question: "Số đồng phân ester ứng với công thức phân tử C4H8O2 là:",
    options: [
      "2",
      "3",
      "4",
      "5"
    ],
    answer: 2,
    explanation: "C4H8O2 có 4 đồng phân ester: HCOOCH2CH2CH3, HCOOCH(CH3)2, CH3COOCH2CH3, CH3CH2COOCH3."
  },
  {
    id: 10,
    stage: 1,
    question: "Trong số các ester C4H8O2, có bao nhiêu đồng phân khi thủy phân thu được acid formic (HCOOH)?",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    answer: 1,
    explanation: "Thủy phân tạo acid formic thì ester phải có dạng HCOOR'. Với C4H8O2, các gốc R' có thể là propyl (-CH2CH2CH3) hoặc isopropyl (-CH(CH3)2). Nên có 2 đồng phân thỏa mãn."
  },
  {
    id: 11,
    stage: 1,
    question: "Tên gọi danh pháp quốc tế của hợp chất CH3COOC2H5 là:",
    options: [
      "Methyl acetate",
      "Ethyl acetate",
      "Ethyl formate",
      "Methyl propionate"
    ],
    answer: 1,
    explanation: "Tên ester = Tên gốc hydrocarbon Y + tên anion acid X-ate. Gốc C2H5là ethyl, gốc CH3COO- là acetate. Vậy tên gọi là Ethyl acetate."
  },
  {
    id: 12,
    stage: 1,
    question: "Tên gọi của hợp chất có công thức cấu tạo thu gọn HCOOCH3 là:",
    options: [
      "Ethyl formate",
      "Methyl acetate",
      "Methyl formate",
      "Ethyl acetate"
    ],
    answer: 2,
    explanation: "Gốc -CH3 là methyl, gốc HCOO- là formate. Vậy tên ester là Methyl formate."
  },
  {
    id: 13,
    stage: 1,
    question: "Tên gọi của hợp chất ester có công thức cấu tạo CH3COOCH3 là:",
    options: [
      "Methyl formate",
      "Methyl acetate",
      "Ethyl acetate",
      "Methyl propionate"
    ],
    answer: 1,
    explanation: "-CH3 là methyl, CH3COO- là acetate. Tên gọi là Methyl acetate."
  },
  {
    id: 14,
    stage: 1,
    question: "Tên gọi của hợp chất ester có công thức HCOOC2H5 là:",
    options: [
      "Methyl formate",
      "Ethyl formate",
      "Ethyl acetate",
      "Methyl acetate"
    ],
    answer: 1,
    explanation: "Gốc -C2H5 là ethyl, gốc HCOO- là formate => Ethyl formate."
  },
  {
    id: 15,
    stage: 1,
    question: "Tên gọi của hợp chất ester có công thức C2H5COOCH3 là:",
    options: [
      "Methyl propionate",
      "Ethyl acetate",
      "Methyl acetate",
      "Ethyl propionate"
    ],
    answer: 0,
    explanation: "-CH3 là methyl, C2H5COO- là propionate. Vậy tên gọi chính xác là Methyl propionate."
  },

  // ==================== CHẶNG 2: PIRATE TREASURE HUNT (Q16 - Q30) ====================
  {
    id: 16,
    stage: 2,
    question: "Số nguyên tử hydro (H) có trong một phân tử methyl formate (HCOOCH3) là bao nhiêu?",
    options: [
      "2",
      "3",
      "4",
      "6"
    ],
    answer: 2,
    explanation: "Công thức phân tử của methyl formate là C2H4O2. Do đó, một phân tử này có chứa chính xác 4 nguyên tử hydro."
  },
  {
    id: 17,
    stage: 2,
    question: "Công thức cấu tạo thu gọn của ethyl acetate là:",
    options: [
      "CH3COOCH3",
      "CH3COOC2H5",
      "HCOOC2H5",
      "C2H5COOCH3"
    ],
    answer: 1,
    explanation: "Ethyl acetate được tạo thành từ acid acetic (CH3COOH) và alcohol ethyl (C2H5OH). Công thức cấu tạo của nó là CH3COOC2H5."
  },
  {
    id: 18,
    stage: 2,
    question: "Công thức cấu tạo thu gọn của ethyl formate là:",
    options: [
      "HCOOCH3",
      "CH3COOC2H5",
      "HCOOC2H5",
      "C2H5COOH"
    ],
    answer: 2,
    explanation: "Ethyl formate được ghép từ gốc formate (HCOO-) và ethyl (-C2H5), do đó công thức cấu tạo là HCOOC2H5."
  },
  {
    id: 19,
    stage: 2,
    question: "Công thức cấu tạo thu gọn của Vinyl acetate là:",
    options: [
      "CH3COOC2H5",
      "CH3COOCH=CH2",
      "CH2=CHCOOCH3",
      "CH3CH2COOCH=CH2"
    ],
    answer: 1,
    explanation: "Vinyl acetate chứa gốc vinyl (-CH=CH2) gắn với gốc acetate (CH3COO-). Công thức cấu tạo là CH3COOCH=CH2."
  },
  {
    id: 20,
    stage: 2,
    question: "Công thức cấu tạo thu gọn của ester Methyl acrylate là:",
    options: [
      "CH2=CHCOOCH3",
      "CH3COOCH=CH2",
      "CH2=C(CH3)COOCH3",
      "CH3COOCH3"
    ],
    answer: 0,
    explanation: "Acrylate là gốc acid không no acrylic (CH2=CH-COO-), ghép với methyl (-CH3). Vậy công thức là CH2=CHCOOCH3."
  },
  {
    id: 21,
    stage: 2,
    question: "Benzyl acetate là ester nổi tiếng có hương thơm dịu ngọt của hoa nhài. Công thức cấu tạo của nó là gì?",
    options: [
      "CH3COOC6H5",
      "C6H5COOCH3",
      "CH3COOCH2C6H5",
      "C6H5COOCH2CH3"
    ],
    answer: 2,
    explanation: "Benzyl acetate chứa gốc benzyl (-CH2C6H5) liên kết với gốc acetate (CH3COO-), do đó công thức là CH3COOCH2C6H5. (Tránh nhầm với gốc phenyl -C6H5)."
  },
  {
    id: 22,
    stage: 2,
    question: "Ester Ethyl propionate có mùi dứa chín được ưa chuộng. Công thức cấu tạo của nó là gì?",
    options: [
      "CH3COOC2H5",
      "C2H5COOC2H5",
      "C2H5COOCH3",
      "CH3COOCH2CH(CH3)2"
    ],
    answer: 1,
    explanation: "Propionate là gốc C2H5COO-, ethyl là -C2H5. Do đó, công thức của ethyl propionate là C2H5COOC2H5."
  },
  {
    id: 23,
    stage: 2,
    question: "Ester nào sau đây thường có mùi chuối chín đặc trưng, được tinh chế làm dầu chuối thơm?",
    options: [
      "Benzyl acetate",
      "Geranyl acetate",
      "Isoamyl acetate",
      "Ethyl butyrate"
    ],
    answer: 2,
    explanation: "Isoamyl acetate (hay isopentyl acetate) là ester có mùi thơm chuối chín đặc trưng rất quen thuộc có công thức CH3COOCH2CH2CH(CH3)2."
  },
  {
    id: 24,
    stage: 2,
    question: "Dự án chế tạo Đĩa Thủy Tinh vô cơ Plexiglas cần ester nào làm nguyên liệu polymer hóa tạo thủy tinh hữu cơ?",
    options: [
      "Methyl acrylate",
      "Methyl methacrylate",
      "Vinyl acetate",
      "Ethyl acrylate"
    ],
    answer: 1,
    explanation: "Poly(methyl methacrylate) - thủy tinh hữu cơ Plexiglas - được điều chế bằng phản ứng trùng hợp monomer methyl methacrylate (CH2=C(CH3)COOCH3)."
  },
  {
    id: 25,
    stage: 2,
    question: "Hợp chất ester nào sau đây có công thức phân tử C4H8O2?",
    options: [
      "Methyl propionate",
      "Ethyl acetate",
      "Isopropyl formate",
      "Tất cả đều đúng"
    ],
    answer: 3,
    explanation: "Các ester như methyl propionate (C3H5O2-CH3), ethyl acetate (C2H3O2-C2H5), và isopropyl formate (CHO2-C3H7) đều có công thức phân tử chung là C4H8O2."
  },
  {
    id: 26,
    stage: 2,
    question: "Hợp chất hữu cơ X có công thức phân tử C3H4O2, tác dụng được với dung dịch NaOH và tham gia phản ứng tráng gương. Tên của X là:",
    options: [
      "Methyl acrylate",
      "Vinyl formate",
      "Ethyl formate",
      "Acrylic acid"
    ],
    answer: 1,
    explanation: "X tác dụng được với NaOH chứng tỏ có nhóm acid hoặc ester. X tráng gương và có 2 O nên có gốc formic HCOO-. Do đó, ester có dạng HCOOR'. Với C3H4O2 thì R' là gốc vinyl (-CH=CH2) => Vinyl formate (HCOOCH=CH2)."
  },
  {
    id: 27,
    stage: 2,
    question: "Một hợp chất X no có công thức phân tử C3H6O2 là ester của acetic acid. Công thức cấu tạo thu gọn của X là:",
    options: [
      "HCOOC2H5",
      "CH3COOCH3",
      "C2H5COOH",
      "CH3COOC2H5"
    ],
    answer: 1,
    explanation: "Vì X là ester của acetic acid (CH3COOH) nên công thức cấu tạo phải có dạng CH3COOR'. Mà X có CTPT C3H6O2 nên R' phải là -CH3. CTCT của X là CH3COOCH3."
  },
  {
    id: 28,
    stage: 2,
    question: "So sánh nhiệt độ sôi của các hợp chất có phân tử khối xấp xỉ nhau: HCOOCH3 (M=60), C2H5OH (M=46), CH3COOH (M=60). Chất có nhiệt độ sôi cao nhất là:",
    options: [
      "HCOOCH3",
      "C2H5OH",
      "CH3COOH",
      "Bằng nhau"
    ],
    answer: 2,
    explanation: "Carboxylic acid có liên kết hydro liên phân tử bền vững nhất, tiếp đó là alcohol. Ester không có liên kết hydro nên nhiệt độ sôi thấp nhất. Do đó CH3COOH có nhiệt độ sôi cao nhất (~118 °C)."
  },
  {
    id: 29,
    stage: 2,
    question: "Trong số các chất sau đây, chất nào có nhiệt độ sôi thấp (nhỏ nhất) do không có khả năng liên kết hydrogen giữa các phân tử?",
    options: [
      "CH3COOH (acetic acid)",
      "C2H5OH (ethanol)",
      "HCOOCH3 (methyl formate)",
      "H2O (nước)"
    ],
    answer: 2,
    explanation: "Methyl formate (HCOOCH3) là một ester. Do các phân tử ester không tạo được liên kết hydro với nhau nên chúng có nhiệt độ sôi thấp nhất trong số các chất trên (chỉ khoảng 32 °C)."
  },
  {
    id: 30,
    stage: 2,
    question: "Mùi hương đặc trưng và tính tan của ester được ứng dụng nhiều nhất trong ngành nào?",
    options: [
      "Làm dung môi pha sơn, hương liệu thực phẩm, mỹ phẩm",
      "Điều chế phân bón hóa học",
      "Làm chất tẩy rửa kim loại nặng độc hại",
      "Sản xuất trực tiếp tơ tằm sinh học"
    ],
    answer: 0,
    explanation: "Ester thường có mùi thơm hoa quả rất dễ chịu, ít tan trong nước và là dung môi phân cực tốt cho nhiều chất hữu cơ. Chúng được ứng dụng rộng rãi làm dung môi, hương liệu mỹ phẩm và thực phẩm."
  },

  // ==================== CHẶNG 3: RUNG CHUÔNG VÀNG (Q31 - Q45) ====================
  {
    id: 31,
    stage: 3,
    question: "Bản chất của phản ứng xà phòng hóa ester là gì?",
    options: [
      "Thủy phân ester trong môi trường acid, là phản ứng thuận nghịch",
      "Thủy phân ester trong môi trường kiềm, là phản ứng thuận nghịch",
      "Thủy phân ester trong môi trường kiềm, là phản ứng một chiều",
      "Nhiệt phân ester tạo hydrocarbon khí"
    ],
    answer: 2,
    explanation: "Phản ứng xà phòng hóa là phản ứng thủy phân ester trong môi trường kiềm (NaOH, KOH,...), là phản ứng xảy ra hoàn toàn một chiều dưới tác dụng của nhiệt độ."
  },
  {
    id: 32,
    stage: 3,
    question: "Thủy phân ester nào sau đây trong môi trường kiềm NaOH luôn thu được muối sodium formate (HCOONa)?",
    options: [
      "CH3COOCH3",
      "HCOOCH2CH3",
      "CH3COOC2H5",
      "CH3CH2COOCH3"
    ],
    answer: 1,
    explanation: "Để thu được sodium formate (HCOONa), ester ban đầu phải có dạng HCOOR'. Trong các phương án, chỉ có HCOOCH2CH3 (ethyl formate) thỏa mãn."
  },
  {
    id: 33,
    stage: 3,
    question: "Xà phòng hóa hoàn toàn ethyl acetate (CH3COOC2H5) bằng dung dịch KOH đun nóng thu được:",
    options: [
      "CH3COONa và C2H5OH",
      "CH3COOK và C2H5OH",
      "HCOOK và CH3OH",
      "C2H5COOK và CH3OH"
    ],
    answer: 1,
    explanation: "CH3COOC2H5 + KOH -(t°)-> CH3COOK + C2H5OH. Muối thu được là potassium acetate (CH3COOK) và alcohol là ethyl alcohol (C2H5OH)."
  },
  {
    id: 34,
    stage: 3,
    question: "Thủy phân hoàn toàn ethyl acetate (CH3COOC2H5) trong dung dịch kiềm NaOH sẽ tạo thành sản phẩm có chứa muối nào?",
    options: [
      "Muối sodium formate (HCOONa)",
      "Muối sodium acetate (CH3COONa)",
      "Muối sodium propionate (C2H5COONa)",
      "Muối sodium acrylate (C2H3COONa)"
    ],
    answer: 1,
    explanation: "Phản ứng thủy phân ethyl acetate: CH3COOC2H5 + NaOH -> CH3COONa + C2H5OH. Muối thu được là CH3COONa (sodium acetate)."
  },
  {
    id: 35,
    stage: 3,
    question: "Cho methyl formate phản ứng với dung dịch NaOH nóng, sản phẩm hữu cơ thu được là:",
    options: [
      "CH3COONa và HCOOH",
      "HCOONa và CH3OH",
      "CH3COONa và CH3OH",
      "HCOONa và C2H5OH"
    ],
    answer: 1,
    explanation: "HCOOCH3 + NaOH -> HCOONa (sodium formate) + CH3OH (methyl alcohol)."
  },
  {
    id: 36,
    stage: 3,
    question: "Thủy phân chất nào sau đây trong môi trường base NaOH sẽ đồng thời tạo ra sodium formate và ethyl alcohol?",
    options: [
      "CH3COOC2H5",
      "HCOOCH3",
      "HCOOC2H5",
      "C2H5COOCH3"
    ],
    answer: 2,
    explanation: "Nhận biết: muối là sodium formate (gốc HCOO-), alcohol là ethyl alcohol (gốc -C2H5). Do đó công thức ester là HCOOC2H5 (ethyl formate)."
  },
  {
    id: 37,
    stage: 3,
    question: "Ester X có công thức phân tử C4H8O2. Khi thủy phân X thu được muối sodium acetate và alcohol ethyl. Công thức cấu tạo của X là:",
    options: [
      "HCOOCH2CH2CH3",
      "CH3COOC2H5",
      "C2H5COOCH3",
      "CH3COOCH3"
    ],
    answer: 1,
    explanation: "Sản phẩm gồm muối acetate (CH3COO-) và ethyl alcohol (-C2H5), ghép lại được công thức cấu tạo của X là CH3COOC2H5."
  },
  {
    id: 38,
    stage: 3,
    question: "Một ester X có công thức phân tử C3H6O2. Thủy phân hoàn toàn X trong NaOH thu được sản phẩm hữu cơ có chứa muối sodium acetate. Công thức của X là:",
    options: [
      "CH3COOCH3",
      "HCOOCH2CH3",
      "CH3COOC2H5",
      "C2H5COOH"
    ],
    answer: 0,
    explanation: "Muối thu được là sodium acetate (CH3COO-), vì X có 3 C (C3H6O2) nên gốc alcohol chỉ có thể là methyl (-CH3). Vậy công thức cấu tạo của X là CH3COOCH3."
  },
  {
    id: 39,
    stage: 3,
    question: "Cho methyl acetate tác dụng hoàn toàn với dung dịch NaOH, sản phẩm thu được gồm:",
    options: [
      "CH3COONa và C2H5OH",
      "CH3COONa và CH3OH",
      "HCOONa và CH3OH",
      "C2H5COONa và CH3OH"
    ],
    answer: 1,
    explanation: "Methyl acetate (CH3COOCH3) phản ứng với NaOH thu được muối sodium acetate (CH3COONa) và methanol (CH3OH)."
  },
  {
    id: 40,
    stage: 3,
    question: "Để tái tạo ra muối sodium formate (HCOONa), bạn nên lựa chọn thủy phân chất nào sau đây?",
    options: [
      "CH3COOCH3",
      "C2H5COOCH3",
      "HCOOCH3",
      "CH3COOC2H5"
    ],
    answer: 2,
    explanation: "HCOOCH3 (methyl formate) là ester của acid formic, phản ứng với NaOH tạo ra HCOONa và CH3OH."
  },
  {
    id: 41,
    stage: 3,
    question: "Ester X có công thức phân tử C2H4O2 (chính là HCOOCH3). X được tạo thành trực tiếp từ methyl alcohol và acid nào sau đây?",
    options: [
      "Acetic acid (CH3COOH)",
      "Formic acid (HCOOH)",
      "Propionic acid (C2H5COOH)",
      "Oxalic acid (HOOC-COOH)"
    ],
    answer: 1,
    explanation: "HCOOCH3 được tổng hợp qua phản ứng ester hóa giữa methyl alcohol (CH3OH) và formic acid (HCOOH)."
  },
  {
    id: 42,
    stage: 3,
    question: "Thủy phân hoàn toàn ester X trong môi trường base NaOH thu được sodium acetate và alcohol ethyl. Tên gọi đầy đủ của X là:",
    options: [
      "Methyl acetate",
      "Ethyl acetate",
      "Methyl formate",
      "Ethyl formate"
    ],
    answer: 1,
    explanation: "Muối sodium acetate ứng với gốc acetate, alcohol ethyl ứng với gốc ethyl => Tên ester là Ethyl acetate."
  },
  {
    id: 43,
    stage: 3,
    question: "Xà phòng hóa hoàn toàn ethyl acetate bằng muối bazơ NaOH đun nóng. Công thức của muối thu được là gì?",
    options: [
      "CH3COONa",
      "HCOONa",
      "C2H5COONa",
      "CH3COONa và C2H5OH"
    ],
    answer: 0,
    explanation: "Muối sinh ra trong phản ứng xà phòng hóa ethyl acetate (CH3COOC2H5) bằng NaOH là muối sodium acetate, công thức hóa học là CH3COONa."
  },
  {
    id: 44,
    stage: 3,
    question: "Ester X được thủy phân cho ra acetic acid và methyl alcohol. Hãy xác định công thức cấu tạo thu gọn của ester X đó?",
    options: [
      "HCOOCH3",
      "CH3COOC2H5",
      "CH3COOCH3",
      "C2H5COOCH3"
    ],
    answer: 2,
    explanation: "Ester thủy phân ra acetic acid (CH3COOH) và methyl alcohol (CH3OH) phải được tạo thành từ 2 gốc tương ứng: CH3COO- và -CH3 => CH3COOCH3."
  },
  {
    id: 45,
    stage: 3,
    question: "Xà phòng hóa chất hữu cơ X (C4H8O2) thu được hai chất Y và Z. Chất Y tác dụng với acid loãng sinh ra acetic acid, chất Z oxi hóa bởi CuO nóng sinh ra acetaldehyde. Công thức cấu tạo của X là:",
    options: [
      "CH3COOCH2CH3",
      "CH3COOCH=CH2",
      "HCOOCH2CH2CH3",
      "C2H5COOCH3"
    ],
    answer: 0,
    explanation: "Y là CH3COONa do sinh ra CH3COOH. Z oxi hóa ra acetaldehyde (CH3CHO) nên Z là alcohol bậc một có 2C: C2H5OH. Vậy X là CH3COOC2H5 (Ethyl acetate)."
  },

  // ==================== CHẶNG 4: THỬ THÁCH TRỐN THOÁT (Q46 - Q60) ====================
  {
    id: 46,
    stage: 4,
    question: "Ester nào sau đây khi thủy phân trong dung dịch kiềm tạo ra muối sodium acetate?",
    options: [
      "Methyl formate",
      "Ethyl propionate",
      "Methyl acetate",
      "Ethyl formate"
    ],
    answer: 2,
    explanation: "Methyl acetate (CH3COOCH3) thủy phân trong dung dịch kiềm sẽ tạo ra muối sodium acetate (CH3COONa) và methanol."
  },
  {
    id: 47,
    stage: 4,
    question: "Ester nào sau đây khi thủy phân tạo ra muối sodium formate?",
    options: [
      "Ethyl acetate",
      "Propyl formate",
      "Methyl acetate",
      "Potassium acetate"
    ],
    answer: 1,
    explanation: "Propyl formate (HCOOCH2CH2CH3) chứa gốc formate HCOO- nên khi phản ứng với kiềm NaOH sẽ tạo thành sodium formate (HCOONa)."
  },
  {
    id: 48,
    stage: 4,
    question: "Thủy phân ester nào sau đây trong môi trường kiềm thu được methyl alcohol (CH3OH) là sản phẩm alcohol sinh ra?",
    options: [
      "CH3COOCH3",
      "CH3COOC2H5",
      "HCOOC2H5",
      "C2H5COOC2H5"
    ],
    answer: 0,
    explanation: "Ester phản ứng sinh ra CH3OH (methanol) phải có gốc methyl (-CH3) ở đuôi R'. Trong số này có CH3COOCH3 (methyl acetate) là phù hợp."
  },
  {
    id: 49,
    stage: 4,
    question: "Thủy phân ester nào sau đây trong môi trường kiềm thu được ethyl alcohol (C2H5OH)?",
    options: [
      "CH3COOCH3",
      "C2H5COOCH3",
      "HCOOC2H5",
      "CH3COOCH=CH2"
    ],
    answer: 2,
    explanation: "Ester sinh ra ethyl alcohol (C2H5OH) cần chứa gốc -C2H5 ở đuôi. Vậy chọn HCOOC2H5 (ethyl formate)."
  },
  {
    id: 50,
    stage: 4,
    question: "Hương thơm quả đào chín dịu nhẹ, thường dùng bổ sung mùi nước giải khát, chứa thành phần chính là ester nào sau đây?",
    options: [
      "Ethyl butyrate (mùi dứa)",
      "Isoamyl acetate (mùi chuối chín)",
      "Ethyl formate (mùi mận, đào chín)",
      "Benzyl acetate (mùi nhài)"
    ],
    answer: 2,
    explanation: "Ethyl formate có hương thơm đặc trưng của đào, mận chín, thường được chế tạo làm hương liệu ngọt ngào nhân tạo."
  },
  {
    id: 51,
    stage: 4,
    question: "Ester nào sau đây có khả năng tham gia phản ứng tráng bạc với dung dịch AgNO3 trong NH3 nóng?",
    options: [
      "CH3COOCH3",
      "HCOOCH3",
      "CH3COOC2H5",
      "C2H5COOCH3"
    ],
    answer: 1,
    explanation: "Chỉ các ester của acid formic (dạng HCOOR') mới có nhóm chức aldehyde tự do (-CHO) ở gốc format, cho nên chúng có khả năng tham gia phản ứng tráng gương."
  },
  {
    id: 52,
    stage: 4,
    question: "Ester hóa hoàn toàn acid acetic (CH3COOH) và alcohol methyl (CH3OH) xúc tác H2SO4 đặc đun nóng sẽ sinh ra chất nào?",
    options: [
      "CH3COOC2H5",
      "HCOOCH3",
      "CH3COOCH3",
      "C2H5COOCH3"
    ],
    answer: 2,
    explanation: "CH3COOH + CH3OH <=(H2SO4, t°)=> CH3COOCH3 + H2O. Sản phẩm là methyl acetate."
  },
  {
    id: 53,
    stage: 4,
    question: "Để chứng minh nhóm chức aldehyde tồn tại trong acid formic, ta có thể dùng thuốc thử nào sau đây?",
    options: [
      "Dung dịch NaOH nóng",
      "Dung dịch AgNO3 trong NH3 nóng",
      "Dung dịch Na2CO3 giải phóng khí",
      "Kim loại sodium (Na) giải phóng H2"
    ],
    answer: 1,
    explanation: "Dung dịch AgNO3 trong NH3 nóng là thuốc thử đặc trưng để phát hiện nhóm chức aldehyde thông qua hiện tượng kết tủa bạc sáng loáng (phản ứng tráng bạc)."
  },
  {
    id: 54,
    stage: 4,
    question: "Ester được tạo thành từ alcohol ethyl (C2H5OH) và acid acetic (CH3COOH) có công thức cấu tạo là:",
    options: [
      "CH3COOCH3",
      "CH3COOC2H5",
      "C2H5COOCH3",
      "HCOOC2H5"
    ],
    answer: 1,
    explanation: "Liên kết giữa gốc acetate (CH3COO-) và ethyl (-C2H5) tạo ra phân tử CH3COOC2H5 (ethyl acetate)."
  },
  {
    id: 55,
    stage: 4,
    question: "Ester được tạo thành từ alcohol methyl (CH3OH) và acid acetic (CH3COOH) có công thức cấu tạo là:",
    options: [
      "CH3COOCH3",
      "CH3COOC2H5",
      "HCOOCH3",
      "C2H5COOCH3"
    ],
    answer: 0,
    explanation: "Khi cho carboxylate CH3COO- liên kết với alkyl -CH3, ta thu được methyl acetate CH3COOCH3."
  },
  {
    id: 56,
    stage: 4,
    question: "Ester điều chế từ alcohol ethyl (C2H5OH) và acid formic (HCOOH) có tên gọi danh pháp là:",
    options: [
      "Methyl formate",
      "Ethyl formate",
      "Ethyl acetate",
      "Methyl acetate"
    ],
    answer: 1,
    explanation: "Tên gốc alcohol (ethyl) + gốc acid formate => Ethyl formate."
  },
  {
    id: 57,
    stage: 4,
    question: "Ester được điều chế từ alcohol methyl (CH3OH) và acid formic (HCOOH) có tên gọi là:",
    options: [
      "Methyl acetate",
      "Methyl formate",
      "Ethyl formate",
      "Ethyl acetate"
    ],
    answer: 1,
    explanation: "Acid formic ghép với methyl alcohol tạo ra methyl formate (HCOOCH3)."
  },
  {
    id: 58,
    stage: 4,
    question: "Công thức cấu tạo thu gọn của ester điều chế bởi alcohol methylic (methanol) và acid acetic là:",
    options: [
      "CH3COOCH3",
      "HCOOC2H5",
      "HCOOCH3",
      "CH3COOC2H5"
    ],
    answer: 0,
    explanation: "Methanol là CH3OH, acetic acid là CH3COOH. Ester tạo thành có cấu tạo CH3COOCH3."
  },
  {
    id: 59,
    stage: 4,
    question: "Ethyl acetate (CH3COOC2H5) chất lỏng trong suốt có phản ứng với dung dịch nào sau đây?",
    options: [
      "Dung dịch NaCl ở nhiệt độ thường",
      "Dung dịch KHCO3 ở điều kiện thường",
      "Dung dịch NaOH nóng (phản ứng thủy phân kiềm)",
      "Dung dịch AgNO3/NH3 ở nhiệt độ thường"
    ],
    answer: 2,
    explanation: "Ester không chứa nhóm tự do có khả năng phản ứng với muối ăn hoặc tráng gương. Tuy nhiên, nó dễ dàng tham gia phản ứng thủy phân trong môi trường kiềm nóng (NaOH/KOH)."
  },
  {
    id: 60,
    stage: 4,
    question: "Đun nóng cốc chứa hỗn hợp formic acid và alcohol methylic có xúc tác H2SO4 đặc tạo thành ester nào sau đây?",
    options: [
      "CH3COOC2H5 (ethyl acetate)",
      "HCOOCH3 (methyl formate)",
      "HCOOC2H5 (ethyl formate)",
      "CH3COOCH3 (methyl acetate)"
    ],
    answer: 1,
    explanation: "Phản ứng ester hóa carboxylic acid formic (HCOOH) và alcohol methylic (CH3OH) tạo ra methyl formate (HCOOCH3) và nước."
  }
];
