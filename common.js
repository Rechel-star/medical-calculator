const DB_COMMON = [
    {
        "id": "bmi",
        "title": "体重指数 (BMI) 计算与分级",
        "输出": "BMI值 + 体重分级",
        "输入": [
            {
                "name": "height",
                "label": "身高 (cm)",
                "type": "number",
                "placeholder": "170"
            },
            {
                "name": "weight",
                "label": "体重 (kg)",
                "type": "number",
                "placeholder": "65"
            }
        ],
        "计算结果": "function(v){ var h = v.height / 100; var bmi = v.weight / (h * h); bmi = Math.round(bmi * 10) / 10; var level = ''; if(bmi < 18.5) level = '偏瘦'; else if(bmi < 24) level = '正常体重'; else if(bmi < 28) level = '超重'; else level = '肥胖'; return 'BMI = ' + bmi + ' (' + level + ')'; }",
        "计算公式": "BMI = 体重(kg) ÷ (身高(m))²",
        "公式解读": "国际通用体重分级标准，中国人群分级标准：<18.5偏瘦，18.5-23.9正常，24-27.9超重，≥28肥胖",
        "参考范围": "18.5-23.9 为正常",
        "健康建议": "function(res, v){ if(res.includes('偏瘦')) return 'BMI偏低，建议适当增加营养摄入，增重至正常范围。'; if(res.includes('正常')) return 'BMI处于正常范围，建议保持现有健康生活方式。'; if(res.includes('超重')) return 'BMI提示超重，建议控制饮食增加运动，减轻体重降低慢病风险。'; if(res.includes('肥胖')) return 'BMI提示肥胖，肥胖会增加高血压、糖尿病等慢病风险，建议积极减重。'; }",
        "category": "常用公式",
        "适用人群": "所有人群",
        "临床场景": "一般健康评估、营养评估"
    },
    {
        "id": "bsa",
        "title": "体表面积 (BSA) 计算 (多公式)",
        "输出": "不同公式计算的体表面积 (m²)",
        "输入": [
            {
                "name": "height",
                "label": "身高 (cm)",
                "type": "number",
                "placeholder": "170"
            },
            {
                "name": "weight",
                "label": "体重 (kg)",
                "type": "number",
                "placeholder": "65"
            },
            {
                "name": "gender",
                "label": "性别",
                "type": "select",
                "options": ["男", "女"]
            }
        ],
        "计算结果": "function(v){ var w = v.weight; var h = v.height; var m = v.gender === '男'; /* Mosteller 公式 */ var mosteller = Math.sqrt(w * h / 3600); mosteller = Math.round(mosteller * 100)/100; /* Du Bois 公式 */ var dubois = 0.20247 * Math.pow(h/100, 0.725) * Math.pow(w, 0.425); dubois = Math.round(dubois * 100)/100; /* Haycock 公式 */ var haycock = 0.024265 * Math.pow(h, 0.3964) * Math.pow(w, 0.5378); haycock = Math.round(haycock * 100)/100; /* Gehan-George 公式 */ var gehan = 0.235 * Math.pow(h, 0.42246) * Math.pow(w, 0.51456); gehan = Math.round(gehan * 100)/100; return 'Mosteller: ' + mosteller + ' m²\\nDu Bois: ' + dubois + ' m²\\nHaycock: ' + haycock + ' m²\\nGehan-George: ' + gehan + ' m²'; }",
        "计算公式": "提供四种国际常用公式：Mosteller / Du Bois / Haycock / Gehan-George",
        "公式解读": "不同公式计算结果略有差异，临床最常用Mosteller公式，简单准确。Du Bois公式为经典原始公式，Haycock和Gehan-George为更现代的改良公式。",
        "category": "常用公式",
        "适用人群": "所有人群",
        "临床场景": "化疗药物剂量计算、肾功能评估等"
    },
    {
        "id": "ibw",
        "title": "标准体重 (IBW) 计算",
        "输出": "标准体重 (kg)",
        "输入": [
            {
                "name": "height",
                "label": "身高 (cm)",
                "type": "number",
                "placeholder": "170"
            },
            {
                "name": "gender",
                "label": "性别",
                "type": "select",
                "options": ["男", "女"]
            }
        ],
        "计算结果": "function(v){ var h = v.height - 100; if(v.gender === '男'){ var ibw = h * 0.9; } else { var ibw = h * 0.9 - 2.5; } ibw = Math.round(ibw * 10)/10; return '标准体重 = ' + ibw + ' kg'; }",
        "计算公式": "男性：标准体重 = (身高cm - 100) × 0.9；女性：标准体重 = (身高cm - 100) × 0.9 - 2.5",
        "公式解读": "改良Broca标准体重计算公式，按性别差异区分",
        "category": "常用公式",
        "适用人群": "成人",
        "临床场景": "药物剂量计算、营养评估"
    },
    {
        "id": "egfr_ckdepi",
        "title": "eGFR 肾小球滤过率计算 (CKD-EPI 公式)",
        "输出": "估算肾小球滤过率 (mL/min/1.73m²)",
        "输入": [
            {
                "name": "scr",
                "label": "血清肌酐 (μmol/L)",
                "type": "number",
                "placeholder": "80"
            },
            {
                "name": "cysc",
                "label": "血清胱抑素C (mg/L) (可选)",
                "type": "number",
                "placeholder": "0.9"
            },
            {
                "name": "age",
                "label": "年龄 (岁)",
                "type": "number",
                "placeholder": "40"
            },
            {
                "name": "gender",
                "label": "性别",
                "type": "select",
                "options": ["男", "女"]
            },
            {
                "name": "black",
                "label": "黑人种族",
                "type": "checkbox"
            }
        ],
        "计算结果": "function(v){ var scr = v.scr / 88.4; // convert to mg/dL var age = v.age; var isMale = v.gender === '男'; var isBlack = !!v.black; var k = isMale ? 0.9 : 0.7; var a = isMale ? -0.411 : -0.329; if(scr > k) a = -1.209; var egfr = 141 * Math.pow(Math.min(scr/k,1), a) * Math.pow(Math.max(scr/k,1), -1.209) * Math.pow(0.9938, age) * (isMale ? 1.012 : 1) * (isBlack ? 1.159 : 1); egfr = Math.round(egfr * 10)/10; var result = '肌酐版 CKD-EPI eGFR = ' + egfr + ' mL/min/1.73m²'; if(v.cysc) { // 胱抑素C计算 var cys = v.cysc; var ec = 135 * Math.pow(Math.min(cys/0.8, 1), -0.292) * Math.pow(Math.max(cys/0.8, 1), -1.179) * Math.pow(0.995, age) * (isMale ? 1.05 : 1); ec = Math.round(ec * 10)/10; result += '\\n胱抑素C版 CKD-EPI eGFR = ' + ec + ' mL/min/1.73m²'; // 联合计算 var combo = 135 * Math.pow(Math.min(scr/k,1), a) * Math.pow(Math.max(scr/k,1), -1.209) * Math.pow(Math.min(cys/0.8, 1), -0.292) * Math.pow(Math.max(cys/0.8, 1), -0.529) * Math.pow(0.995, age) * (isMale ? 1.07 : 1) * (isBlack ? 1.06 : 1); combo = Math.round(combo * 10)/10; result += '\\n肌酐+胱抑素C联合 eGFR = ' + combo + ' mL/min/1.73m²'; } return result; }",
        "计算公式": "CKD-EPI 2012 公式（支持仅肌酐、仅胱抑素C、肌酐+胱抑素C联合三种计算）",
        "公式解读": "目前国际推荐最准确的eGFR估算公式，比MDRD公式更准确，尤其在GFR接近正常时偏差更小。支持黑人种族校正，按性别、年龄校正。",
        "分级标准": "G1: ≥90 (正常/增高), G2: 60-89 (轻度下降), G3a: 45-59 (轻中度下降), G3b: 30-44 (中重度下降), G4: 15-29 (重度下降), G5: <15 (肾衰竭)",
        "category": "常用公式",
        "适用人群": "成人",
        "临床场景": "慢性肾脏病肾功能评估"
    },
    {
        "id": "ccr_cg",
        "title": "肌酐清除率计算 (Cockcroft-Gault公式)",
        "输出": "肌酐清除率 (mL/min)",
        "输入": [
            {
                "name": "scr",
                "label": "血清肌酐 (mg/dL)",
                "type": "number",
                "placeholder": "1.0"
            },
            {
                "name": "age",
                "label": "年龄 (岁)",
                "type": "number",
                "placeholder": "40"
            },
            {
                "name": "weight",
                "label": "体重 (kg)",
                "type": "number",
                "placeholder": "65"
            },
            {
                "name": "gender",
                "label": "性别",
                "type": "select",
                "options": ["男", "女"]
            }
        ],
        "计算结果": "function(v){ var ccr = ((140 - v.age) * v.weight) / (72 * v.scr); if(v.gender !== '男') ccr = ccr * 0.85; ccr = Math.round(ccr * 10)/10; return 'Cockcroft-Gault 肌酐清除率 = ' + ccr + ' mL/min'; }",
        "计算公式": "CCr = [(140 - 年龄) × 体重(kg)] ÷ (72 × 血肌酐(mg/dL))，女性 × 0.85",
        "公式解读": "经典的肌酐清除率估算公式，身高校正版本可进一步提高准确性，目前仍广泛用于药物剂量调整。",
        "category": "常用公式",
        "适用人群": "成人",
        "临床场景": "肾功能评估、药物剂量调整"
    },
    {
        "id": "egfr_pediatric_schwartz",
        "title": "儿童 eGFR 计算 (经典Schwartz公式)",
        "输出": "估算肾小球滤过率 (mL/min/1.73m²)",
        "输入": [
            {
                "name": "scr",
                "label": "血清肌酐 (mg/dL)",
                "type": "number",
                "placeholder": "0.5"
            },
            {
                "name": "height",
                "label": "身高 (cm)",
                "type": "number",
                "placeholder": "100"
            }
        ],
        "计算结果": "function(v){ var egfr = 0.413 * v.height / v.scr; egfr = Math.round(egfr * 10)/10; return 'Schwartz公式 eGFR = ' + egfr + ' mL/min/1.73m²'; }",
        "计算公式": "eGFR = 0.413 × (身高cm) ÷ (血肌酐mg/dL)",
        "公式解读": "经典儿童eGFR估算公式，适用于2-16岁儿童婴幼儿公式略有不同，系数改为0.33",
        "修正说明": "修正了原年龄阶段划分错误，新版公式适用于所有儿童，按身高比例计算",
        "category": "常用公式",
        "适用人群": "2-16岁儿童",
        "临床场景": "儿童慢性肾脏病肾功能评估"
    },
    {
        "id": "carboplatin_dose",
        "title": "卡铂剂量计算 (Calvert公式)",
        "输出": "卡铂给药剂量 (mg)",
        "输入": [
            {
                "name": "auc",
                "label": "目标AUC (mg·min/mL)",
                "type": "number",
                "placeholder": "5"
            },
            {
                "name": "ccr",
                "label": "肌酐清除率 (mL/min)",
                "type": "number",
                "placeholder": "60"
            }
        ],
        "计算结果": "function(v){ var dose = v.auc * (v.ccr + 25); dose = Math.round(dose); return 'Calvert公式 卡铂剂量 = ' + dose + ' mg'; }",
        "计算公式": "剂量(mg) = AUC × (肌酐清除率 + 25)",
        "公式解读": "Calvert公式是卡铂剂量计算金标准，根据肾功能和目标AUC计算剂量，与体表面积公式相比更精准，减少毒性或剂量不足。",
        "category": "常用公式",
        "适用人群": "成人肿瘤患者",
        "临床场景": "化疗剂量计算"
    },
    {
        "id": "charlson_cci",
        "title": "Charlson 合并症指数 (CCI) - 19项经典版",
        "输出": "Charlson 合并症指数总分",
        "输入": [
            {
                "name": "age",
                "label": "年龄",
                "type": "select",
                "options": [
                    "< 40岁 (0分)",
                    "40-49岁 (1分)",
                    "50-59岁 (2分)",
                    "60-69岁 (3分)",
                    "≥ 70岁 (4分)"
                ]
            },
            {
                "name": "mi",
                "label": "心肌梗死病史",
                "type": "checkbox"
            },
            {
                "name": "chf",
                "label": "充血性心力衰竭",
                "type": "checkbox"
            },
            {
                "name": "pvd",
                "label": "周围血管疾病",
                "type": "checkbox"
            },
            {
                "name": "cevd",
                "label": "脑血管疾病",
                "type": "checkbox"
            },
            {
                "name": "dementia",
                "label": "痴呆",
                "type": "checkbox"
            },
            {
                "name": "copd",
                "label": "慢性阻塞性肺疾病",
                "type": "checkbox"
            },
            {
                "name": "ctd",
                "label": "结缔组织病",
                "type": "checkbox"
            },
            {
                "name": "pud",
                "label": "消化性溃疡",
                "type": "checkbox"
            },
            {
                "name": "mld",
                "label": "轻度肝病",
                "type": "checkbox"
            },
            {
                "name": "dm",
                "label": "糖尿病 (无并发症)",
                "type": "checkbox"
            },
            {
                "name": "dm_complicated",
                "label": "糖尿病伴器官损害",
                "type": "checkbox"
            },
            {
                "name": "hemiplegia",
                "label": "偏瘫",
                "type": "checkbox"
            },
            {
                "name": "ckd",
                "label": "中重度肾病",
                "type": "checkbox"
            },
            {
                "name": "tumor",
                "label": "实体肿瘤（无转移）",
                "type": "checkbox"
            },
            {
                "name": "leukemia",
                "label": "白血病",
                "type": "checkbox"
            },
            {
                "name": "lymphoma",
                "label": "淋巴瘤",
                "type": "checkbox"
            },
            {
                "name": "modsevere_liver",
                "label": "中重度肝病",
                "type": "checkbox"
            },
            {
                "name": "metastatic",
                "label": "转移性实体瘤",
                "type": "checkbox"
            },
            {
                "name": "hiv",
                "label": "HIV感染",
                "type": "checkbox"
            }
        ],
        "计算结果": "function(v){ var s = 0; s += parseInt(v.age.match(/\\d+/)[0]); if(v.mi) s += 1; if(v.chf) s += 1; if(v.pvd) s += 1; if(v.cevd) s += 1; if(v.dementia) s += 1; if(v.copd) s += 1; if(v.ctd) s += 1; if(v.pud) s += 1; if(v.mld) s += 1; if(v.dm) s += 1; if(v.dm_complicated) s += 2; if(v.hemiplegia) s += 2; if(v.ckd) s += 2; if(v.tumor) s += 2; if(v.leukemia) s += 2; if(v.lymphoma) s += 2; if(v.modsevere_liver) s += 3; if(v.metastatic) s += 6; if(v.hiv) s += 6; return 'Charlson 合并症指数总分 = ' + s; }",
        "计算公式": "年龄加分 + 各合并症加权计分",
        "公式解读": "用于预测合并症对患者生存率的影响，总分越高，合并症负担越重，预期生存率越低。",
        "category": "常用公式",
        "适用人群": "成人",
        "临床场景": "预后评估、合并症负担分析"
    },
    {
        "id": "grace_acs_risk",
        "title": "GRACE 急性冠脉综合征 (ACS) 缺血风险评分",
        "输出": "GRACE风险评分及风险分级",
        "输入": [
            {
                "name": "age",
                "label": "年龄 (岁)",
                "type": "number",
                "placeholder": "60"
            },
            {
                "name": "hr",
                "label": "心率 (次/分)",
                "type": "number",
                "placeholder": "70"
            },
            {
                "name": "sbp",
                "label": "收缩压 (mmHg)",
                "type": "number",
                "placeholder": "120"
            },
            {
                "name": "creatinine",
                "label": "血清肌酐 (mg/dL)",
                "type": "number",
                "placeholder": "1.0"
            },
            {
                "name": "killip",
                "label": "Killip分级",
                "type": "select",
                "options": [
                    "I级 (0分)",
                    "II级 (20分)",
                    "III级 (39分)",
                    "IV级 (59分)"
                ]
            },
            {
                "name": "cardiac_arrest",
                "label": "入院时心脏骤停",
                "type": "checkbox"
            },
            {
                "name": "st_elevation",
                "label": "ST段偏移",
                "type": "checkbox"
            },
            {
                "name": "elevated_tn",
                "label": "心肌损伤标志物升高",
                "type": "checkbox"
            }
        ],
        "计算结果": "function(v){ var score = 0; if(v.age < 30) score += 0; else if(v.age < 40) score += 8; else if(v.age < 50) score += 25; else if(v.age < 60) score += 41; else if(v.age < 70) score += 58; else if(v.age < 80) score += 75; else score += 91; if(v.hr < 50) score += 0; else if(v.hr < 70) score += 3; else if(v.hr < 90) score += 9; else if(v.hr < 110) score += 15; else if(v.hr < 150) score += 24; else if(v.hr < 200) score += 30; else score += 39; if(v.sbp < 80) score += 49; else if(v.sbp < 100) score += 35; else if(v.sbp < 120) score += 23; else if(v.sbp < 140) score += 11; else if(v.sbp < 160) score += 0; else if(v.sbp < 200) score += 4; else score += 14; if(v.creatinine < 0.5) score += 2; else if(v.creatinine < 1.0) score += 5; else if(v.creatinine < 1.5) score += 8; else if(v.creatinine < 2.0) score += 13; else if(v.creatinine < 3.0) score += 21; else if(v.creatinine < 4.0) score += 29; else score += 37; score += parseInt(v.killip.match(/\\d+/)[0]); if(v.cardiac_arrest) score += 39; if(v.st_elevation) score += 28; if(v.elevated_tn) score += 14; var level = ''; if(score <= 108) level = '低危 (院内死亡率 < 1%)'; else if(score <= 140) level = '中危 (院内死亡率 1-3%)'; else level = '高危 (院内死亡率 > 3%)'; return 'GRACE评分 = ' + score + ' (' + level + ')'; }",
        "计算公式": "GRACE 2000 多因素危险评分",
        "公式解读": "用于评估急性冠脉综合征患者院内死亡风险，指导治疗决策，评分越高风险越大。",
        "category": "常用公式",
        "适用人群": "急性冠脉综合征患者",
        "临床场景": "ACS危险分层"
    },
    {
        "id": "diabetes_who_criteria",
        "title": "糖尿病诊断标准 (WHO/ADA 2019)",
        "type": "reference_table",
        "输出": "糖尿病诊断标准参考",
        "参考表": [
            { "诊断项目": "空腹血糖(FPG)", "糖尿病诊断": "≥ 7.0 mmol/L (126 mg/dL)", "正常": "< 6.1 mmol/L (110 mg/dL)", "空腹血糖受损(IFG)": "6.1-6.9 mmol/L (110-125 mg/dL)" },
            { "诊断项目": "OGTT 2小时血糖 (2hPG)", "糖尿病诊断": "≥ 11.1 mmol/L (200 mg/dL)", "正常": "< 7.8 mmol/L (140 mg/dL)", "糖耐量异常(IGT)": "7.8-11.0 mmol/L (140-199 mg/dL)" },
            { "诊断项目": "随机血糖", "糖尿病诊断": "≥ 11.1 mmol/L (200 mg/dL) + 典型糖尿病症状", "正常": "< 11.1 mmol/L", "-": "-" },
            { "诊断项目": "HbA1c (糖化血红蛋白)", "糖尿病诊断": "≥ 6.5%", "正常": "< 5.7%", "糖尿病前期": "5.7%-6.4%" }
        ],
        "公式解读": "诊断标准：典型糖尿病症状 + 满足以下任意一项即可诊断：①空腹血糖≥7.0mmol/L；②OGTT 2h≥11.1mmol/L；③随机血糖≥11.1mmol/L；④HbA1c≥6.5%。无典型症状者需改日重复检查确认。",
        "category": "常用公式",
        "适用人群": "所有人群",
        "临床场景": "糖尿病筛查诊断"
    },
    {
        "id": "maintenance_fluid_421",
        "title": "维持液体需要量计算 (4-2-1法则)",
        "输出": "每日维持液体需要量 (mL/day)",
        "输入": [
            {
                "name": "weight",
                "label": "体重 (kg)",
                "type": "number",
                "placeholder": "20"
            }
        ],
        "计算结果": "function(v){ var w = v.weight; var fluid = 0; if(w <= 10) fluid = w * 4; else if(w <= 20) fluid = 10*4 + (w - 10)*2; else fluid = 10*4 + 10*2 + (w - 20)*1; fluid = Math.round(fluid); return '每日维持液体需要量 = ' + fluid + ' mL/天 (' + Math.round(fluid/w) + ' mL/kg/天)'; }",
        "计算公式": "4-2-1法则：第一个10kg体重：4 mL/kg/h；第二个10kg体重：2 mL/kg/h；剩余体重：1 mL/kg/h",
        "公式解读": "儿科常用维持液体计算法则，第一个10kg按100mL/kg/d，第二个10kg按50mL/kg/d，剩余体重按25mL/kg/d，和4-2-1法则按小时计算一致。",
        "category": "常用公式",
        "适用人群": "儿童及成人",
        "临床场景": "静脉补液方案制定"
    },
    {
        "id": "adult_hypernatremia_rehydration",
        "title": "成人高钠脱水补液计算公式",
        "输出": "估计缺水量 (L)",
        "输入": [
            {
                "name": "current_na",
                "label": "当前血钠 (mmol/L)",
                "type": "number",
                "placeholder": "155"
            },
            {
                "name": "weight",
                "label": "目前体重 (kg)",
                "type": "number",
                "placeholder": "60"
            }
        ],
        "计算结果": "function(v){ var deficit = ((v.current_na - 140)/140) * 0.6 * v.weight; deficit = Math.round(deficit * 100)/100; return '估计总缺水量 = ' + deficit + ' L'; }",
        "计算公式": "缺水量(L) = [(测得血钠 - 140)/140] × 体重(kg) × 0.6 (男性系数0.6，女性系数0.5)",
        "公式解读": "高钠脱水时，总体水缺水量估算公式，这是最简单常用的一种计算方法。另外还有Adrogue-Madias公式可计算纠正血钠速率。",
        "健康建议": "一般纠正高钠血症速度不宜超过 0.5 mmol/L/h，24小时不超过 10 mmol/L，避免脑水肿。",
        "category": "常用公式",
        "适用人群": "成人高钠血症患者",
        "临床场景": "电解质紊乱补液计算"
    },
    {
        "id": "gc_dose_conversion",
        "title": "全身用糖皮质激素剂量换算参考表",
        "type": "reference_table",
        "输出": "糖皮质激素等效剂量换算",
        "参考表": [
            { "糖皮质激素": "氢化可的松", "等效剂量(mg)": "20", "抗炎效价": "1" },
            { "糖皮质激素": "可的松", "等效剂量(mg)": "25", "抗炎效价": "0.8" },
            { "糖皮质激素": "泼尼松", "等效剂量(mg)": "5", "抗炎效价": "4" },
            { "糖皮质激素": "泼尼松龙", "等效剂量(mg)": "5", "抗炎效价": "4" },
            { "糖皮质激素": "甲泼尼龙", "等效剂量(mg)": "4", "抗炎效价": "5" },
            { "糖皮质激素": "曲安西龙", "等效剂量(mg)": "4", "抗炎效价": "5" },
            { "糖皮质激素": "倍他米松", "等效剂量(mg)": "0.6", "抗炎效价": "25" },
            { "糖皮质激素": "地塞米松", "等效剂量(mg)": "0.75", "抗炎效价": "30" }
        ],
        "公式解读": "不同糖皮质激素之间剂量换算，以抗炎活性为基础换算为等效剂量，方便医生在不同药物之间切换，参考医脉通临床计算工具呈现方式。",
        "category": "常用公式",
        "适用人群": "所有使用激素患者",
        "临床场景": "激素剂量调整转换"
    },
    {
        "id": "glucose_unit_conversion",
        "title": "血糖单位转换 (mmol/L ↔ mg/dL)",
        "输出": "转换结果",
        "输入": [
            {
                "name": "value",
                "label": "血糖值",
                "type": "number",
                "placeholder": "5.6"
            },
            {
                "name": "from_unit",
                "label": "原单位",
                "type": "select",
                "options": ["mmol/L", "mg/dL"]
            }
        ],
        "计算结果": "function(v){ if(v.from_unit === 'mmol/L'){ var mgdl = v.value * 18; mgdl = Math.round(mgdl * 10)/10; return v.value + ' mmol/L = ' + mgdl + ' mg/dL'; } else { var mmol = v.value / 18; mmol = Math.round(mmol * 100)/100; return v.value + ' mg/dL = ' + mmol + ' mmol/L'; } }",
        "计算公式": "mg/dL = mmol/L × 18；mmol/L = mg/dL ÷ 18",
        "公式解读": "血糖单位转换，修正了原逻辑错误，转换关系正确，参考医脉通直接双向转换呈现，方便使用。",
        "category": "常用公式",
        "适用人群": "所有人群",
        "临床场景": "血糖结果单位转换"
    },
    {
        "id": "lipid_unit_conversion",
        "title": "血脂单位转换 (mmol/L ↔ mg/dL)",
        "输出": "各血脂成分转换结果",
        "输入": [
            {
                "name": "tc",
                "label": "总胆固醇 (输入对应单位数值)",
                "type": "number",
                "placeholder": "5.2"
            },
            {
                "name": "tg",
                "label": "甘油三酯 (输入对应单位数值)",
                "type": "number",
                "placeholder": "1.7"
            },
            {
                "name": "hdlc",
                "label": "HDL-胆固醇 (输入对应单位数值)",
                "type": "number",
                "placeholder": "1.04"
            },
            {
                "name": "ldlc",
                "label": "LDL-胆固醇 (输入对应单位数值)",
                "type": "number",
                "placeholder": "3.4"
            },
            {
                "name": "from_unit",
                "label": "原单位",
                "type": "select",
                "options": ["mmol/L → mg/dL", "mg/dL → mmol/L"]
            }
        ],
        "计算结果": "function(v){ var res = ''; if(v.from_unit === 'mmol/L → mg/dL'){ if(v.tc) res += '总胆固醇: ' + Math.round(v.tc * 38.67) + ' mg/dL\\n'; if(v.tg) res += '甘油三酯: ' + Math.round(v.tg * 88.5) + ' mg/dL\\n'; if(v.hdlc) res += 'HDL-C: ' + Math.round(v.hdlc * 38.67) + ' mg/dL\\n'; if(v.ldlc) res += 'LDL-C: ' + Math.round(v.ldlc * 38.67) + ' mg/dL'; } else { if(v.tc) res += '总胆固醇: ' + Math.round((v.tc / 38.67) * 100)/100 + ' mmol/L\\n'; if(v.tg) res += '甘油三酯: ' + Math.round((v.tg / 88.5) * 100)/100 + ' mmol/L\\n'; if(v.hdlc) res += 'HDL-C: ' + Math.round((v.hdlc / 38.67) * 100)/100 + ' mmol/L\\n'; if(v.ldlc) res += 'LDL-C: ' + Math.round((v.ldlc / 38.67) * 100)/100 + ' mmol/L'; } return res; }",
        "计算公式": "转换系数：TC/HDL-C/LDL-C: 1 mmol/L = 38.67 mg/dL；TG: 1 mmol/L = 88.5 mg/dL",
        "公式解读": "补充了所有常用血脂成分的单位转换，不再仅包含总胆固醇，满足临床需要。",
        "category": "常用公式",
        "适用人群": "所有人群",
        "临床场景": "血脂结果单位转换"
    },
    {
        "id": "body_fat_bmi",
        "title": "成人BMI法体脂率推算",
        "输出": "体脂率及相关成分计算结果",
        "输入": [
            {
                "name": "height",
                "label": "身高 (cm)",
                "type": "number",
                "placeholder": "170"
            },
            {
                "name": "weight",
                "label": "体重 (kg)",
                "type": "number",
                "placeholder": "65"
            },
            {
                "name": "gender",
                "label": "性别",
                "type": "select",
                "options": ["男", "女"]
            },
            {
                "name": "age",
                "label": "年龄 (岁)",
                "type": "number",
                "placeholder": "30"
            }
        ],
        "计算结果": "function(v){ var h = v.height / 100; var bmi = v.weight / (h * h); var bmi = Math.round(bmi * 10)/10; var bf; if(v.gender === '男'){ bf = 1.20 * bmi + 0.23 * v.age - 16.2; } else { bf = 1.20 * bmi + 0.23 * v.age - 5.4; } bf = Math.round(bf * 10)/10; var fat_mass = bf / 100 * v.weight; fat_mass = Math.round(fat_mass * 10)/10; var ffm = v.weight - fat_mass; ffm = Math.round(ffm * 10)/10; return 'BMI: ' + bmi + '\\n体脂率: ' + bf + '%\\n身体脂肪量: ' + fat_mass + ' kg\\n去脂体重(瘦体重): ' + ffm + ' kg'; }",
        "计算公式": "BMI法推算体脂率：男性: BF% = 1.20×BMI + 0.23×年龄 - 16.2；女性: BF% = 1.20×BMI + 0.23×年龄 - 5.4",
        "公式解读": "直接输入身高、体重即可计算，不需要先输入BMI，同时输出体脂率、总体脂肪量、去脂体重三项结果，满足临床需求。",
        "category": "常用公式",
        "适用人群": "成人",
        "临床场景": "体成分评估"
    },
];