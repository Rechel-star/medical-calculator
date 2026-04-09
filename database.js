const BULTIN_DB = [
    {
        "id": "apcs_tree",
        "title": "Adelaide 儿科昏迷评分 (APCS) 决策系统",
        "输出": "意识状态分级及急救决策",
        "输入": [
            {
                "name": "eye",
                "label": "睁眼反应 (Eye Opening)",
                "type": "select",
                "options": [
                    "自动睁眼 (4分)",
                    "呼唤后睁眼 (3分)",
                    "疼痛刺激后睁眼 (2分)",
                    "无反应 (1分)"
                ]
            },
            {
                "name": "verbal",
                "label": "语言/啼哭反应 (最佳语言能力)",
                "type": "select",
                "options": [
                    "微笑/发声互动 (5分)",
                    "哭闹可安抚 (4分)",
                    "对疼痛刺激呻吟/哭闹 (3分)",
                    "对疼痛刺激仅有微弱反应 (2分)",
                    "完全无反应 (1分)"
                ]
            },
            {
                "name": "motor",
                "label": "运动反应 (最佳运动能力)",
                "type": "select",
                "options": [
                    "自主活动/可服从指令 (6分)",
                    "对疼痛刺激定位躲闪 (5分)",
                    "对疼痛刺激回缩躲避 (4分)",
                    "疼痛刺激后肢体异常屈曲(去皮质强直) (3分)",
                    "疼痛刺激后肢体伸直(去脑强直) (2分)",
                    "完全无反应 (1分)"
                ]
            }
        ],
        "计算结果": "function(v){ var s = 0; s += parseInt(v.eye.match(/\\d/)[0]); s += parseInt(v.verbal.match(/\\d/)[0]); s += parseInt(v.motor.match(/\\d/)[0]); if(s <= 8) return s + '分 (重型昏迷/危重)'; if(s <= 12) return s + '分 (中型受损/密切观察)'; return s + '分 (轻型/正常状态)'; }",
        "计算公式": "Eye(1-4) + Verbal(1-5) + Motor(1-6) 总分计算",
        "公式解读": "APCS 专为婴幼儿设计的昏迷评分，解决了 GCS 在无法言语儿童中评估不准的问题。8 分是儿科神经外科干预的关键阈值，得分 ≤ 8 分提示患儿失去气道保护能力，需紧急处理。",
        "参考范围": "总分 3-15 分",
        "健康建议": "function(res, v){ if(res.includes('重型')) return '极其危重！评分 ≤8 分定义为深昏迷。必须立即：1. 进行气管插管以保障呼吸道通畅；2. 建立静脉通路降低颅内压（如甘露醇）；3. 紧急复查头颅 CT 排除血肿或脑疝。'; if(res.includes('中型')) return '提示存在明显的神经系统受损。需每 15-30 分钟复评一次，若评分进行性下降，需立即按重型流程处理。'; return '意识状态基本正常。建议关注患儿是否有频繁呕吐或剧烈哭闹，排除迟发性颅内损伤。'; }",
        "category": "儿科学",
        "适用人群": "无法有效言语交流的婴幼儿及儿童",
        "临床场景": "小儿头外伤、惊厥后、重症脑病评估"
    },
    {
        "id": "apgar",
        "title": "阿普加评分 (Apgar) - 新生儿即刻评估",
        "输出": "窒息程度判断",
        "输入": [
            {
                "name": "hr",
                "label": "心率",
                "type": "select",
                "options": [
                    "无心率 (0分)",
                    "<100次/分 (1分)",
                    "≥100次/分 (2分)"
                ]
            },
            {
                "name": "resp",
                "label": "呼吸",
                "type": "select",
                "options": [
                    "无 (0分)",
                    "慢、不规则 (1分)",
                    "佳、大声啼哭 (2分)"
                ]
            },
            {
                "name": "muscle",
                "label": "肌张力",
                "type": "select",
                "options": [
                    "松弛 (0分)",
                    "四肢略屈曲 (1分)",
                    "四肢活动好 (2分)"
                ]
            },
            {
                "name": "reflex",
                "label": "反射/刺激反应（弹足底/插鼻管）",
                "type": "select",
                "options": [
                    "无反应 (0分)",
                    "有些动作/皱眉 (1分)",
                    "哭闹、喷嚏 (2分)"
                ]
            },
            {
                "name": "color",
                "label": "皮肤颜色",
                "type": "select",
                "options": [
                    "全身青紫/苍白 (0分)",
                    "躯干红四肢青紫 (1分)",
                    "全身粉红 (2分)"
                ]
            }
        ],
        "计算结果": "function(v){ var s = 0; s += v.hr.includes('2分')?2:(v.hr.includes('1分')?1:0); s += v.resp.includes('2分')?2:(v.resp.includes('1分')?1:0); s += v.muscle.includes('2分')?2:(v.muscle.includes('1分')?1:0); s += v.reflex.includes('2分')?2:(v.reflex.includes('1')?1:0); s += v.color.includes('2分')?2:(v.color.includes('1')?1:0); if(s<=3) return s + '分 (重度窒息)'; if(s<=7) return s + '分 (轻度窒息)'; return s + '分 (正常)'; }",
        "计算公式": "Appearance(皮肤颜色) + Pulse(心率) + Grimace(反射) + Activity(肌张力) + Respiration(呼吸) 五项总计",
        "公式解读": "分别在出生后 1 分钟、5 分钟评估。1 分钟评分反映宫内窘迫程度，5 分钟评分反映复苏效果及预后。",
        "参考范围": "8-10分为正常",
        "健康建议": "function(res, v){ if(res.includes('重度')) return '警告：需立即进行气管插管及高级新生儿生命支持(NRP)！'; if(res.includes('轻度')) return '建议：立即清理呼吸道、吸氧并评估是否需要加压给氧。'; return '目前：生命体征平稳，按常规产后流程护理。'; }",
        "category": "儿科学",
        "适用人群": "刚出生的新生儿",
        "临床场景": "产房/新生儿科"
    },
    {
        "id": "neo_temp_nte",
        "title": "新生儿中性温度 (NTE) 参考表",
        "输出": "建议暖箱初始温度",
        "type": "reference_table",
        "参考表": [
            { "出生体重": "< 1000g", "出生<24小时": "35.0-36.0℃", "出生>24小时": "34.0-35.0℃" },
            { "出生体重": "1000-1500g", "出生<24小时": "34.0-35.0℃", "出生24-48小时": "33.5-34.5℃", "出生>48小时": "33.0-34.0℃" },
            { "出生体重": "1501-2000g", "出生<24小时": "33.0-34.0℃", "出生>24小时": "32.5-33.5℃" },
            { "出生体重": "> 2000g", "建议温度": "32.0-33.0℃" }
        ],
        "说明": "中性温度是指能保持新生儿正常体温，而氧耗量及代谢率最低的环境温度。体重越轻、日龄越小，所需环境温度越高。",
        "建议": "目标维持患儿腋温在 36.5℃ - 37.4℃，极低出生体重儿建议加用塑料薄膜覆盖并维持湿度 70%-80%，每 2-4 小时监测一次核心体温，动态调整暖箱温度。",
        "category": "儿科学",
        "适用人群": "早产儿及低出生体重儿",
        "临床场景": "NICU 入院暖箱预热及日常调节"
    },
    {
        "id": "neonatal_jaundice_reference",
        "title": "新生儿病理性黄疸干预参考表（小时龄分区）",
        "type": "reference_table",
        "输出": "黄疸风险分区",
        "参考表": [
            { "出生小时龄": "< 24h", "高危区(立即光疗)": "> 102μmol/L (6mg/dL)", "低危区": "≤ 102μmol/L" },
            { "出生小时龄": "24-48h", "高危区(立即光疗)": "> 222μmol/L (13mg/dL)", "中危区(密切监测)": "153-222μmol/L (9-13mg/dL)", "低危区": "< 153μmol/L" },
            { "出生小时龄": "48-72h", "高危区(立即光疗)": "> 290μmol/L (17mg/dL)", "中危区(密切监测)": "205-290μmol/L (12-17mg/dL)", "低危区": "< 205μmol/L" },
            { "出生小时龄": "> 72h", "高危区(立即光疗)": "> 308μmol/L (18mg/dL)", "中危区(密切监测)": "256-308μmol/L (15-18mg/dL)", "低危区": "< 256μmol/L" }
        ],
        "说明": "基于 Bhutani 小时龄胆红素百分位曲线，高危因素存在（溶血、窒息、G6PD缺乏）时光疗阈值需下移。",
        "建议": "高危区需立即光疗，中危区每 8-12 小时复查胆红素，低危区可观察随访。",
        "category": "儿科学",
        "适用人群": "新生儿",
        "临床场景": "新生儿黄疸评估"
    },
    {
        "id": "preterm_jaundice_intervention",
        "title": "不同胎龄/出生体重早产儿黄疸光疗干预参考标准 (mg/dL)",
        "type": "reference_table",
        "输出": "光疗干预阈值",
        "参考表": [
            { "出生体重": "< 1000g", "光疗阈值": "5-7 mg/dL", "换血阈值": "12-14 mg/dL" },
            { "出生体重": "1000-1500g", "光疗阈值": "7-9 mg/dL", "换血阈值": "15-18 mg/dL" },
            { "出生体重": "1500-2000g", "光疗阈值": "10-12 mg/dL", "换血阈值": "18-20 mg/dL" },
            { "出生体重": "2000-2500g", "光疗阈值": "12-14 mg/dL", "换血阈值": "20-22 mg/dL" }
        ],
        "说明": "早产儿血脑屏障发育不完善，干预阈值低于足月儿，需更积极光疗避免核黄疸。",
        "category": "儿科学",
        "适用人群": "早产儿",
        "clinical": "NICU 黄疸管理"
    },
    {
        "id": "pzrt_test",
        "title": "餐后血清锌浓度反应试验 (PZRT) 缺锌判定",
        "输出": "缺锌判定结果",
        "输入": [
            {
                "name": "z0",
                "label": "空腹血清锌浓度 (μg/dL)",
                "type": "number",
                "placeholder": "80"
            },
            {
                "name": "z2",
                "label": "标准餐后 2 小时血清锌浓度 (μg/dL)",
                "type": "number",
                "placeholder": "100"
            },
            {
                "name": "symptom",
                "label": "存在临床缺锌表现（生长迟缓/异食癖/反复皮炎）",
                "type": "checkbox"
            }
        ],
        "计算结果": "function(v){ var ratio = (v.z2 - v.z0) / v.z0; if(ratio > 0.15) return '试验阳性 (上升率 ' + Math.round(ratio*100) + '%)'; if(ratio > 0) return '试验阴性 (上升率 ' + Math.round(ratio*100) + '%)'; return '结果异常：数值未升反降，请检查检测过程'; }",
        "计算公式": "PZRT 反应率 = (餐后2小时锌 - 空腹锌) / 空腹锌",
        "公式解读": "上升率 > 15% 提示体内锌储备不足，对补充的锌有强烈反应，支持缺锌诊断。",
        "参考范围": "上升率 ≤ 15% 为阴性，提示体内锌储备充足",
        "健康建议": "function(res, v){ if(res.includes('阳性')){ if(v.z0 < 65) return '典型缺锌：空腹基础值低且反应强烈。建议按 1-2mg/kg/d 补充元素锌，疗程 1-2 个月，并增加红肉、贝类等富锌食物摄入。'; return '亚临床缺锌：虽然空腹值正常，但反应率升高提示体内锌储备不足，建议日常饮食增加富锌食物。'; } if(res.includes('阴性')){ if(v.symptom) return '需考虑吸收障碍：存在临床症状但试验阴性，建议排查肠道吸收不良综合征或蛋白丢失性肠病。'; return '提示体内锌代谢处于稳态，暂不支持缺锌诊断。'; } return '结果异常，请核对检测流程是否符合标准（是否空腹、锌负荷量是否足够）。'; }",
        "category": "儿科学",
        "适用人群": "怀疑锌缺乏的儿童",
        "临床场景": "营养代谢性疾病评估"
    },
  {
    "id": "jaundice_preterm",
    "title": "不同胎龄/出生体重早产儿黄疸干预标准",
    "输出": "干预界限",
    "输入": [
      {
        "name": "w",
        "label": "出生体重(g)",
        "type": "number",
        "placeholder": "1200"
      }
    ],
    "计算结果": "function(v){return v.w<1000?'光疗:5-7mg/dL':v.w<1500?'光疗:7-9mg/dL':'光疗:10-12mg/dL';}",
    "计算公式": "按体重分层阈值",
    "公式解读": "早产儿血脑屏障未完善，干预阈值更低",
    "参考范围": "极低体重儿阈值低",
    "健康建议": "function(res, v){ return '对于体重 ' + v.w + ' g 的早产儿，光疗界限为 ' + res + '。早产儿血脑屏障发育极不完善，即使胆红素水平不高也极易发生核黄疸，必须积极采取预防性或治疗性光疗。'; }",
    "category": "儿科学",
    "适用人群": "早产儿",
    "临床场景": "NICU"
  },
    {
        "id": "pzrt_test",
        "title": "餐后血清锌浓度反应试验 (PZRT) 缺锌判定",
        "输出": "缺锌判定结果",
        "输入": [
            {
                "name": "z0",
                "label": "空腹血清锌浓度 (μg/dL)",
                "type": "number",
                "placeholder": "80"
            },
            {
                "name": "z2",
                "label": "标准餐后 2 小时血清锌浓度 (μg/dL)",
                "type": "number",
                "placeholder": "100"
            },
            {
                "name": "symptom",
                "label": "存在临床缺锌表现（生长迟缓/异食癖/反复皮炎）",
                "type": "checkbox"
            }
        ],
        "计算结果": "function(v){ var ratio = (v.z2 - v.z0) / v.z0; if(ratio > 0.15) return '试验阳性 (上升率 ' + Math.round(ratio*100) + '%)'; if(ratio > 0) return '试验阴性 (上升率 ' + Math.round(ratio*100) + '%)'; return '结果异常：数值未升反降，请检查检测过程'; }",
        "计算公式": "PZRT 反应率 = (餐后2小时锌 - 空腹锌) / 空腹锌",
        "公式解读": "上升率 > 15% 提示体内锌储备不足，对补充的锌有强烈反应，支持缺锌诊断。",
        "参考范围": "上升率 ≤ 15% 为阴性，提示体内锌储备充足",
        "健康建议": "function(res, v){ if(res.includes('阳性')){ if(v.z0 < 65) return '典型缺锌：空腹基础值低且反应强烈。建议按 1-2mg/kg/d 补充元素锌，疗程 1-2 个月，并增加红肉、贝类等富锌食物摄入。'; return '亚临床缺锌：虽然空腹值正常，但反应率升高提示体内锌储备不足，建议日常饮食增加富锌食物。'; } if(res.includes('阴性')){ if(v.symptom) return '需考虑吸收障碍：存在临床症状但试验阴性，建议排查肠道吸收不良综合征或蛋白丢失性肠病。'; return '提示体内锌代谢处于稳态，暂不支持缺锌诊断。'; } return '结果异常，请核对检测流程是否符合标准（是否空腹、锌负荷量是否足够）。'; }",
        "category": "儿科学",
        "适用人群": "怀疑锌缺乏的儿童",
        "临床场景": "营养代谢性疾病评估"
    },
    {
        "id": "kd_diagnosis",
        "title": "川崎病 (KD) 临床诊断参考标准",
        "type": "reference_table",
        "输出": "诊断分型参考",
        "诊断标准": [
            "发热 5 天以上",
            "双侧球结膜充血（无渗出）",
            "口唇口腔改变：口唇干红皲裂、杨梅舌、口腔黏膜弥漫充血",
            "多形性皮疹（无水疱、结痂）",
            "四肢改变：急性期手足硬性水肿，恢复期指趾端甲下和皮肤交界处出现膜状脱皮",
            "颈部淋巴结肿大（直径 > 1.5cm）"
        ],
        "分型说明": [
            { "分型": "典型川崎病", "说明": "发热 ≥ 5 天 + 满足 5 项临床表现中 4 项以上" },
            { "分型": "不完全型川崎病", "说明": "发热 ≥ 5 天 + 满足 2-3 项临床表现 + 超声心动图发现冠脉扩张(Z>2) / 实验室指标支持(CRP≥30mg/L或血小板≥450×10^9/L)" }
        ],
        "说明": "若发热不满5天但超声已见冠脉扩张，可提前诊断。治疗建议在发病 10 天内给予 IVIG 2g/kg + 阿司匹林。",
        "category": "儿科学",
        "适用人群": "不明原因持续发热的婴幼儿",
        "临床场景": "儿科发热待查评估"
    },
    {
        "id": "kd_coronary_z",
        "title": "川崎病冠状动脉损伤分级 (Z值)",
        "输出": "冠脉损伤程度分级",
        "输入": [
            {
                "name": "z",
                "label": "冠状动脉 Z 值（经体表面积校正）",
                "type": "number",
                "placeholder": "2.5"
            }
        ],
        "计算结果": "function(v){ if(v.z < 2) return 'Z = ' + v.z + ' (冠状动脉内径正常)'; if(v.z < 2.5) return 'Z = ' + v.z + ' (轻度冠脉扩张)'; if(v.z < 5) return 'Z = ' + v.z + ' (中度冠脉扩张)'; return 'Z = ' + v.z + ' (巨大冠脉瘤)'; }",
        "计算公式": "Z值 = (实测冠脉内径 - 同年龄同BSA人群均值) / 同年龄同BSA人群标准差",
        "公式解读": "Z值是评估川崎病冠脉损伤最准确的指标，比直接测量内径更客观。",
        "分级标准": "Z<2 正常；2≤Z<2.5 轻度扩张；2.5≤Z<5 中度扩张；Z≥5 巨大冠脉瘤",
        "健康建议": "function(res, v){ if(res.includes('正常')) return '冠状动脉内径正常，建议在发病后第 1、2、6 个月随访超声心动图。'; if(res.includes('巨大')) return '极高危：巨大冠脉瘤极易并发血栓形成、管腔狭窄或破裂。必须长期使用阿司匹林联合抗凝药物（华法林/低分子肝素），并严格限制剧烈运动。'; if(res.includes('轻度') || res.includes('中度')){ return res + '，需要持续使用抗血小板药物治疗，增加超声心动图随访频次，监测冠脉变化。'; } return ''; }",
        "category": "儿科学",
        "适用人群": "川崎病患儿",
        "临床场景": "心内科随访/超声心动图评估"
    },
    {
        "id": "pda_hspda",
        "title": "动脉导管未闭 (PDA) 血流动力学评估评分 (NICU 早产儿)",
        "输出": "hsPDA 评分及处理建议",
        "输入": [
            {
                "name": "diameter",
                "label": "导管直径",
                "type": "select",
                "options": [
                    "< 1.5mm (0分)",
                    "1.5-3.0mm (1分)",
                    "> 3.0mm (2分)"
                ]
            },
            {
                "name": "la_ao",
                "label": "LA/Ao (左心房/主动脉根部比值)",
                "type": "select",
                "options": [
                    "< 1.3 (0分)",
                    "1.3-1.4 (1分)",
                    "> 1.4 (2分)"
                ]
            },
            {
                "name": "direction",
                "label": "血流方向",
                "type": "select",
                "options": [
                    "双向/左向右(收缩期仅有) (0分)",
                    "全心动周期左向右 (1分)",
                    "右向左分流 (2分)"
                ]
            },
            {
                "name": "reversal",
                "label": "舒张期降主动脉血流逆转",
                "type": "select",
                "options": [
                    "无 (0分)",
                    "有 (1分)"
                ]
            }
        ],
        "计算结果": "function(v){ var s = 0; s += parseInt(v.diameter.match(/\\d/)[0]); s += parseInt(v.la_ao.match(/\\d/)[0]); s += parseInt(v.direction.match(/\\d/)[0]); s += parseInt(v.reversal.match(/\\d/)[0]); if(s >= 3) return '总分 ' + s + ' (血流动力学显著 PDA / hsPDA，建议治疗)'; return '总分 ' + s + ' (非显著性 PDA，可观察)'; }",
        "计算公式": "早产儿 hsPDA 超声评分（改良 NICE 评分标准）",
        "公式解读": "评分 ≥ 3 分提示为有血流动力学意义的动脉导管未闭，需要临床干预。",
        "参考范围": "0-2 分：非显著性；≥3 分：显著性",
        "健康建议": "function(res, v){ if(res.includes('建议治疗')){ return '判定为 hsPDA，存在肺充血和左心负荷增加风险。建议：1. 适当限制液体入量；2. 首选口服布洛芬或对乙酰氨基酚关闭导管；3. 药物治疗失败或存在药物禁忌时，可请心外科评估手术结扎。'; } return '目前 PDA 无显著血流动力学影响，可以继续临床观察，部分早产儿可自行闭合。'; }",
        "category": "儿科学",
        "适用人群": "早产儿（尤其是极低出生体重儿）",
        "临床场景": "NICU 心脏超声评估"
    },
    {
        "id": "downe_score",
        "title": "Downe 评分 - 新生儿呼吸窘迫严重度评估",
        "输出": "呼吸窘迫评分及呼吸支持建议",
        "输入": [
            {
                "name": "rr",
                "label": "呼吸频率",
                "type": "select",
                "options": [
                    "< 60 次/分 (0分)",
                    "60 - 80 次/分 (1分)",
                    "> 80 次/分或有呼吸暂停 (2分)"
                ]
            },
            {
                "name": "cyanosis",
                "label": "发绀情况",
                "type": "select",
                "options": [
                    "无发绀 (0分)",
                    "吸入 40% 氧后发绀缓解 (1分)",
                    "吸入 >40% 氧仍存在发绀 (2分)"
                ]
            },
            {
                "name": "retraction",
                "label": "吸气性三凹征",
                "type": "select",
                "options": [
                    "无三凹征 (0分)",
                    "轻度三凹征 (1分)",
                    "明显且持续三凹征 (2分)"
                ]
            },
            {
                "name": "grunting",
                "label": "呼气性呻吟",
                "type": "select",
                "options": [
                    "无呻吟 (0分)",
                    "仅听诊可闻及呻吟 (1分)",
                    "裸耳可闻及呻吟 (2分)"
                ]
            },
            {
                "name": "breath_sound",
                "label": "双肺呼吸音",
                "type": "select",
                "options": [
                    "呼吸音清晰对称 (0分)",
                    "一侧/局部呼吸音减弱 (1分)",
                    "双肺呼吸音明显减弱/几乎听不到 (2分)"
                ]
            }
        ],
        "计算结果": "function(v){ var s = 0; var getVal = function(x){ return parseInt(x.match(/(\\d+)分/)[1] || 0); }; s += getVal(v.rr); s += getVal(v.cyanosis); s += getVal(v.retraction); s += getVal(v.grunting); s += getVal(v.breath_sound); if(s >= 8 || v.breath_sound.includes('几乎听不到')) return s + ' 分 (重度：提示临床呼吸衰竭)'; if(s >= 4) return s + ' 分 (中度：呼吸窘迫)'; return s + ' 分 (轻度：轻微呼吸窘迫)'; }",
        "计算公式": "五项体征总分（0-10分）",
        "公式解读": "评分越高提示肺顺应性越差，需要的呼吸支持等级越高。总分≥8分或呼吸音消失提示病情极重。",
        "参考范围": "0-3分：轻度；4-7分：中度；≥8分：重度",
        "健康建议": "function(res, v){ if(res.includes('重度')) return '重症预警：患儿已达呼吸衰竭标准，需立即建立人工气道行有创机械通气，并尽早给予肺表面活性物质(PS)。'; if(res.includes('中度')) return '中度呼吸窘迫，建议立即启动经鼻持续气道正压通气(NCPAP)，持续监测血气分析，若2小时内无改善需升级呼吸支持。'; return '轻度呼吸窘迫，可先予鼻导管/面罩吸氧，密切观察呼吸频率和发绀变化，维持环境温度稳定。'; }",
        "category": "儿科学",
        "适用人群": "新生儿（足月儿/近足月儿）",
        "临床场景": "新生儿窒息复苏后 / NICU 入院评估"
    },
    {
        "id": "duke_tree",
        "title": "Duke 感染性心内膜炎 (IE) 诊断决策路径",
        "输出": "诊断结论",
        "输入": [
            {
                "name": "major_one",
                "label": "血培养阳性（典型致病菌）",
                "type": "checkbox"
            },
            {
                "name": "major_two",
                "label": "心内膜受累证据（瓣膜反流/赘生物/瓣膜破坏）",
                "type": "checkbox"
            },
            {
                "name": "minor_one",
                "label": "易患因素（基础心脏病/静脉药物滥用）",
                "type": "checkbox"
            },
            {
                "name": "minor_two",
                "label": "发热 ≥ 38℃",
                "type": "checkbox"
            },
            {
                "name": "minor_three",
                "label": "血管栓塞现象（动脉栓塞/脑出血/Janeway损害）",
                "type": "checkbox"
            },
            {
                "name": "minor_four",
                "label": "免疫现象（Osler结节/Roth斑/肾小球肾炎）",
                "type": "checkbox"
            },
            {
                "name": "minor_five",
                "label": "微生物学证据（血培养阳性但不符合主要标准）",
                "type": "checkbox"
            }
        ],
        "结果": "function(v){ var mj = 0; if(v.major_one) mj++; if(v.major_two) mj++; var mn = 0; if(v.minor_one) mn++; if(v.minor_two) mn++; if(v.minor_three) mn++; if(v.minor_four) mn++; if(v.minor_five) mn++; if( (mj >= 2) || (mj === 1 && mn >=3) || (mn >=5) ) return '符合 Duke 诊断标准：确诊感染性心内膜炎'; if( (mj === 1 && mn === 1) || (mj === 0 && mn >=3) ) return '疑似感染性心内膜炎，需进一步检查'; return '不符合诊断标准'; }",
        "计算公式": "Duke 改良诊断标准计分法",
        "公式解读": "主要标准 2项，次要标准 5项，满足特定组合即可确诊或疑诊。",
        "category": "儿科学",
        "适用人群": "儿童及成人",
        "临床场景": "感染性心内膜炎排查",
        "health": "function(res, v){ if(res.includes('确诊')) return '确诊感染性心内膜炎，需立即收入院，经验性选用敏感抗生素足疗程治疗，并密切随访心脏超声。'; if(res.includes('疑似')) return '疑似病例，需进一步重复血培养、完善心脏超声（必要时经食管超声）检查，密切监测病情变化。'; return '暂不支持诊断，可继续排查其他发热原因。'; }"
    },
    {
        "id": "pediatric_trauma_score",
        "title": "儿科创伤评分 (PTS)",
        "输出": "创伤严重度评分及分流建议",
        "输入": [
            {
                "name": "age",
                "label": "年龄",
                "type": "select",
                "options": [
                    "< 5岁 (+1分)",
                    "≥ 5岁 (-1分)"
                ]
            },
            {
                "name": "systolic_bp",
                "label": "收缩压",
                "type": "select",
                "options": [
                    "> 90mmHg (+1分)",
                    "50-90mmHg (-1分)",
                    "< 50mmHg (+0分？不对，原标准：<50mmHg是-2分)"
                ]
            },
            {
                "name": "gcs",
                "label": "GCS 评分",
                "type": "select",
                "options": [
                    "≥ 13 (+1分)",
                    "9-12 (-1分)",
                    "≤ 8 (-2分)"
                ]
            },
            {
                "name": "skeletal",
                "label": "骨骼损伤",
                "type": "select",
                "options": [
                    "无 (+1分)",
                    "闭合性骨折/连枷胸 (-1分)",
                    "开放性骨盆/多发骨折 (-2分)"
                ]
            },
            {
                "name": "head_neck",
                "label": "头颈部创伤",
                "type": "select",
                "options": [
                    "无 (+1分)",
                    "闭合性颅脑损伤 (-1分)",
                    "穿透伤/大出血 (-2分)"
                ]
            }
        ],
        "计算结果": "function(v){ var s = 0; s += v.age.includes('+1')?1:-1; var bp = v.systolic_bp.includes('< 50')?-2:(v.systolic_bp.includes('50-90')?-1:1); s += bp; var g = v.gcs.includes('≥ 13')?1:(v.gcs.includes('9-12')?-1:-2); s += g; var sk = v.skeletal.includes('无')?1:(v.skeletal.includes('闭合')?-1:-2); s += sk; var h = v.head_neck.includes('无')?1:(v.head_neck.includes('闭合')?-1:-2); s += h; if(s <= 2) return '总分 ' + s + ' (重度创伤，需转创伤中心)'; if(s <= 7) return '总分 ' + s + ' (中度创伤，需住院治疗)'; return '总分 ' + s + ' (轻度创伤，可门诊处理)'; }",
        "category": "儿科学",
        "适用人群": "0-15岁创伤患儿",
        "临床场景": "急诊创伤分诊分流"
    },
  {
    "id": "ped_fluid",
    "title": "儿童补液",
    "输出": "总量(mL)",
    "输入": [
      {
        "name": "wt",
        "label": "体重(kg)",
        "type": "number",
        "placeholder": "15"
      }
    ],
    "计算结果": "function(v){return v.wt<=10?v.wt*100:v.wt<=20?1000+(v.wt-10)*50:1500+(v.wt-20)*20;}",
    "计算公式": "Holliday-Segar 100-50-20法",
    "公式解读": "儿童每日生理维持基础需水量",
    "参考范围": "随体重变化",
    "健康建议": "function(res, v){ return '计算得出患儿全天基础生理需要量为 ' + res + ' mL。若患儿存在呕吐、腹泻等脱水表现，在开具静脉输液处方时，必须在此基础量上，额外叠加累积损失量与继续丢失量。'; }",
    "category": "儿科学",
    "适用人群": "儿童",
    "临床场景": "儿科病房"
  },
  {
    "id": "ped_io_rate",
    "title": "儿童的入量和出量(每公斤和每小时)",
    "输出": "速率(mL/kg/h)",
    "输入": [
      {
        "name": "v",
        "label": "总量(mL)",
        "type": "number",
        "placeholder": "100"
      },
      {
        "name": "wt",
        "label": "体重(kg)",
        "type": "number",
        "placeholder": "10"
      },
      {
        "name": "t",
        "label": "时间(h)",
        "type": "number",
        "placeholder": "4"
      }
    ],
    "计算结果": "function(v){return Math.round(v.v/v.wt/v.t*100)/100;}",
    "计算公式": "总量 ÷ 体重 ÷ 时间",
    "公式解读": "标准化出入量以便评估肾脏及循环负荷",
    "参考范围": "尿量1-2 mL/kg/h为正常",
    "健康建议": "function(res, v){ if(res < 1) return '速率为 ' + res + ' mL/kg/h。若为尿量，提示已达到少尿标准，需结合前负荷(脱水状态)及血压综合评估是否发生急性肾损伤；若为输液量，则偏于保守。'; if(res > 3) return '速率为 ' + res + ' mL/kg/h。若为输液量，提示入量较快，需警惕液体超负荷及心衰风险。'; return '速率控制在合理生理范围。'; }",
    "category": "儿科学",
    "适用人群": "儿童",
    "临床场景": "PICU"
  },
  {
    "id": "ped_uic_evaluation",
    "title": "儿童尿碘浓度 (UIC) 营养状态评价",
    "version": "1.0",
    "输出": "碘营养状态判定及干预决策",
    "输入": [
      {
        "name": "uic_val",
        "label": "尿碘中位数/测定值 (μg/L)",
        "type": "number",
        "placeholder": "例如：85"
      },
      {
        "name": "target_group",
        "label": "评估对象",
        "type": "select",
        "options": [
          "学龄儿童 (6-12岁)",
          "婴幼儿 (0-2岁)",
          "青少年 (>12岁)"
        ]
      }
    ],
    "计算结果": "function(v){ var x = v.uic_val; if(x < 20) return '严重碘缺乏 (Severe Deficiency)'; if(x < 50) return '中度碘缺乏 (Moderate Deficiency)'; if(x < 100) return '轻度碘缺乏 (Mild Deficiency)'; if(x < 200) return '碘营养充足 (Adequate)'; if(x < 300) return '超足量 (More than adequate)'; return '碘过量 (Excessive)'; }",
    "计算公式": "基于 WHO/ICCIDD 推荐的儿童尿碘评价标准 (μg/L)",
    "公式解读": "决策逻辑：1. <100μg/L 统称为碘缺乏；2. 100-199μg/L 为最理想状态；3. >300μg/L 需警惕高碘性甲状腺肿或自身免疫性甲状腺炎风险。",
    "参考范围": "群体评估通常采用尿碘中位数 (MUI)，个体需多次采样以排除波动",
    "健康建议": "function(res, v){ if(res.includes('缺乏')){ return '【干预决策】1. 确保食用合格碘盐；2. 增加富碘食物（海带、紫菜、海鱼）摄入；3. 若属于重度缺乏，需在医师指导下补充碘油丸或含碘多维生素。'; } if(res.includes('过量')){ return '【决策建议】需排查水源性高碘或过量使用补碘强化剂。高碘可能诱发甲状腺功能减退或甲状腺炎，建议限制高碘海产品摄入并监测 TSH 指标。'; } return '【评价】碘营养状态理想。建议继续维持平衡膳食，食用合格碘盐即可。'; }",
    "category": "儿科学",
    "适用人群": "0 - 18 岁儿童及青少年",
    "临床建议": "地方性甲状腺肿防治/儿童发育健康筛查"
  },
  {
    "id": "pku_phe_control_tree",
    "title": "儿童各年龄血苯丙氨酸 (Phe) 理想浓度控制",
    "version": "1.0",
    "输出": "浓度评价及临床干预决策",
    "输入": [
      {
        "name": "age_group",
        "label": "患儿年龄段",
        "type": "select",
        "options": [
          "0 - 12 岁 (关键发育期)",
          "> 12 岁 (青少年及成人)",
          "准备怀孕/妊娠期 (育龄女性)"
        ]
      },
      {
        "name": "phe_level",
        "label": "当前血 Phe 浓度 (μmol/L)",
        "type": "number",
        "placeholder": "例如：240"
      }
    ],
    "计算结果": "function(v){ var phe = v.phe_level; if(v.age_group.includes('0 - 12')){ if(phe < 120) return '浓度偏低 (低苯丙氨酸血症风险)'; if(phe <= 360) return '浓度理想 (目标范围：120-360)'; return '浓度过高 (神经损伤风险)'; } if(v.age_group.includes('> 12')){ if(phe < 120) return '浓度偏低'; if(phe <= 600) return '浓度理想 (目标范围：120-600)'; return '浓度偏高'; } if(v.age_group.includes('妊娠')){ if(phe >= 120 && phe <= 360) return '妊娠期理想'; return '妊娠期非理想 (风险：母源性PKU综合征)'; } return '未定'; }",
    "计算公式": "基于 ACMG 及中国新生儿筛查委员会 PKU 诊疗共识",
    "公式解读": "决策逻辑：1. 12岁以下是脑发育金标准期，上限严控在360μmol/L；2. 12岁后可放宽至600μmol/L，但严禁超过此值以防认知下降；3. 浓度过低(<120)会引起蛋白质营养不良及皮疹。",
    "参考范围": "120 - 360 μmol/L (2-6 mg/dL) 为儿科通用黄金标准",
    "健康建议": "function(res, v){ if(res.includes('理想')){ return '【临床建议】当前饮食控制良好。建议：1. 维持当前低 Phe 配方奶及特殊饮食比例；2. 定期监测血 Phe 浓度（1岁内每周1次，1-12岁每2周1次）；3. 确保热卡及蛋白质总量达标。'; } if(res.includes('过高') || res.includes('偏高')){ return '【临床建议】存在神经毒性风险！1. 立即核查患儿天然蛋白质摄入是否超标；2. 增加不含 Phe 的特制氨基酸配方粉比例；3. 3天后复测血 Phe；4. 关注是否有感染等应激情况导致组织分解。'; } if(res.includes('偏低')){ return '【临床建议】存在必需氨基酸缺乏风险！1. 需适当增加天然饮食（如母乳或普通配方奶）比例；2. 监测体重增长及毛发皮肤状态，防止出现“低苯丙氨酸血症”导致的生长停滞。'; } return '【风险预警】妊娠期 Phe 过高将导致胎儿小头畸形及先心病！必须严格限食并每日监测。'; }",
    "category": "儿科学",
    "适用人群": "苯丙酮尿症 (PKU) 确诊患儿及成人",
    "clinical_scenario": "PKU 门诊定期随访/居家饮食管理路径"
  },
  {
    "id": "iron_prep",
    "title": "儿童口服铁制剂的规格及剂量表",
    "输出": "元素铁剂量(mg/kg)",
    "输入": [
      {
        "name": "wt",
        "label": "体重(kg)",
        "type": "number",
        "placeholder": "10"
      }
    ],
    "计算结果": "function(v){return '治疗量: '+(v.wt*3)+'-'+(v.wt*6)+' mg/d (分2-3次)';}",
    "计算公式": "3-6mg/kg/d 元素铁",
    "公式解读": "缺铁性贫血的口服补充剂量",
    "参考范围": "最大不超过150-200mg/d",
    "健康建议": "function(res, v){ return '推荐元素铁补充剂量为 ' + res + '。口服铁剂时，强烈建议同时服用维生素C或富含VitC的果汁以促进吸收，绝对避免与牛奶、茶、钙剂同服。疗程需在血红蛋白恢复正常后继续维持1-2个月以补足铁储存。'; }",
    "category": "儿科学",
    "适用人群": "缺铁性贫血患儿",
    "临床场景": "儿保科/血液科"
  },
  {
    "id": "iron_supplement_reference",
    "title": "儿童口服铁制剂规格及参考建议",
    "输出": "铁制剂规格及常见摄入方式",
    "输入": [
      {
        "name": "weight",
        "label": "体重 (kg)",
        "type": "number",
        "placeholder": "10"
      },
      {
        "name": "drug_type",
        "label": "常见制剂类型",
        "type": "select",
        "options": [
          {
            "label": "右旋糖酐铁口服液",
            "value": "dextran_50"
          },
          {
            "label": "蛋白琥珀酸铁口服溶液",
            "value": "protein_40"
          },
          {
            "label": "硫酸亚铁糖浆",
            "value": "sulfate_5ml"
          }
        ]
      }
    ],
    "计算结果": "function(v){ return '需根据临床诊断及体重由医师确定具体剂量。'; }",
    "计算公式": "元素铁摄入量需由专科医生依据儿童体重、缺铁程度及实验室检查结果制定",
    "公式解读": "铁剂治疗属于临床治疗范畴，剂量通常根据体重计算并分次服用",
    "参考范围": "治疗性补铁通常需要血红蛋白恢复正常后再持续服用一段时间，具体遵医嘱",
    "健康建议": "function(res, v){ return '说明：此工具仅用于查询铁制剂规格。注意事项：1. 建议在两餐之间服用，减少胃肠道刺激；2. 可与维生素C同服以促进吸收；3. 避免与牛奶、茶、咖啡同时服用；4. 服药后粪便颜色可能变深属于正常现象；5. 若出现严重腹痛或腹泻应及时就医。所有剂量请严格遵循医嘱。'; }",
    "category": "儿科学",
    "适用人群": "6个月-18岁儿童",
    "临床场景": "儿内科/儿保科"
  },
  {
    "id": "ett_uncuffed",
    "title": "儿童无球囊气管内插管尺寸",
    "输出": "导管内径(ID) mm",
    "输入": [
      {
        "name": "age",
        "label": "年龄(岁)",
        "type": "number",
        "placeholder": "4"
      }
    ],
    "计算结果": "function(v){return (v.age/4 + 4).toFixed(1);}",
    "计算公式": "年龄/4 + 4",
    "公式解读": "快速估算无囊插管粗细",
    "参考范围": "随年龄增长",
    "健康建议": "function(res, v){ return '预估导管内径为 ' + res + ' mm。儿科气道解剖特殊，插管后务必通过听诊双肺呼吸音对称性及监测呼气末二氧化碳(EtCO2)波形，来最终确认导管的正确位置和深度。'; }",
    "category": "儿科学",
    "适用人群": "1岁以上儿童",
    "临床场景": "急诊/麻醉"
  },
  {
    "id": "ped_bms_tree",
    "title": "儿童细菌性脑膜炎评分 (BMS)",
    "version": "1.1",
    "输出": "细菌性 vs 病毒性脑膜炎风险分级",
    "输入": [
      {
        "name": "csf_gram",
        "label": "1. 脑脊液 (CSF) 涂片找菌",
        "type": "select",
        "options": [
          "未见细菌 (0分)",
          "发现革兰氏染色阳性/阴性菌 (2分)"
        ]
      },
      {
        "name": "seizure",
        "label": "2. 病史：起病前或就诊时有抽搐/癫痫发作",
        "type": "select",
        "options": [
          "无 (0分)",
          "有 (1分)"
        ]
      },
      {
        "name": "anc_level",
        "label": "3. 外周血绝对中性粒细胞计数 (ANC)",
        "type": "select",
        "options": [
          "< 10 × 10⁹/L (0分)",
          "≥ 10 × 10⁹/L (1分)"
        ]
      },
      {
        "name": "csf_protein",
        "label": "4. 脑脊液 (CSF) 蛋白水平",
        "type": "select",
        "options": [
          "< 80 mg/dL (0分)",
          "≥ 80 mg/dL (1分)"
        ]
      },
      {
        "name": "csf_anc",
        "label": "5. 脑脊液 (CSF) 中性粒细胞绝对计数",
        "type": "select",
        "options": [
          "< 1000 cells/μL (0分)",
          "≥ 1000 cells/μL (1分)"
        ]
      }
    ],
    "计算结果": "function(v){ var getScore = function(str){ var m = str.match(/(\\d+)分\\)/); return m ? parseInt(m[1]) : 0; }; var s = getScore(v.csf_gram) + getScore(v.seizure) + getScore(v.anc_level) + getScore(v.csf_protein) + getScore(v.csf_anc); if(s >= 2) return s + ' 分 (高风险：细菌性脑膜炎可能)'; if(s === 1) return s + ' 分 (中风险：需留院严密观察)'; return '0 分 (极低风险：提示无菌性/病毒性)'; }",
    "计算公式": "BMS = CSF染色(2) + 抽搐(1) + 血ANC(1) + CSF蛋白(1) + CSF中性粒(1)",
    "公式解读": "决策逻辑：1. 只要 CSF 涂片阳性即为高危(2分)；2. 若总分为 0，预测细菌性脑膜炎的阴性预测值 (NPV) 接近 100%；3. 适用于 >29 天且 CSF 已提示白细胞增多的患儿。",
    "参考范围": "评分 0 分时，细菌性脑膜炎的可能性极小 (<0.1%)",
    "健康建议": "function(res, v){ if(res.includes('高风险')){ return '【临床建议】1. 立即启动经验性广谱抗生素治疗（如万古霉素联合三代头孢）；2. 完善脑脊液培养及 PCR 筛查；3. 严密监测颅内压及电解质。'; } if(res.includes('中风险')){ return '【临床建议】建议：1. 暂时留院观察或收治住院；2. 动态复查脑脊液改变；3. 若临床表现恶化，应按细菌性脑膜炎处理。'; } return '【临床建议】1. 提示为无菌性/病毒性脑膜炎可能性大；2. 若患儿精神状态良好、喂养正常，可考虑对症支持治疗及门诊随访；3. 等待 48h 培养结果。'; }",
    "category": "儿科学",
    "适用人群": "脑脊液白细胞增多 (CSF Pleocytosis) 的患儿",
    "clinical_scenario": "急诊及儿科病房初步判定脑膜炎类型及抗生素使用决策"
  },
  {
    "id": "ped_ross_heart_failure",
    "title": "儿童心衰指数评分 (Modified Ross Score)",
    "version": "1.0",
    "输出": "心功能分级及临床干预决策",
    "输入": [
      {
        "name": "feeding",
        "label": "1. 喂养史 (针对婴儿/幼儿)",
        "type": "select",
        "options": [
          "正常 (0分)",
          "吃奶量减少/进食时间延长 (1分)",
          "吃奶时大汗/进食极少/生长发育迟缓 (2分)"
        ]
      },
      {
        "name": "resp_rate",
        "label": "2. 呼吸频率 (RR, 次/分)",
        "type": "select",
        "options": [
          "正常 (< 40) (0分)",
          "轻度增快 (40-50) (1分)",
          "中度增快 (50-60) (2分)",
          "明显增快 (> 60) (3分)"
        ]
      },
      {
        "name": "heart_rate",
        "label": "3. 心率 (HR, 次/分)",
        "type": "select",
        "options": [
          "正常 (< 160) (0分)",
          "稍快 (160-170) (1分)",
          "明显增快 (> 170) (2分)"
        ]
      },
      {
        "name": "liver",
        "label": "4. 肝肋下长度 (肝肿大评价)",
        "type": "select",
        "options": [
          "< 2 cm (0分)",
          "2 - 3 cm (1分)",
          "> 3 cm (2分)"
        ]
      }
    ],
    "计算结果": "function(v){ var s = 0; s += parseInt(v.feeding.match(/\\d/)[0]); s += parseInt(v.resp_rate.match(/\\d/)[0]); s += parseInt(v.heart_rate.match(/\\d/)[0]); s += parseInt(v.liver.match(/\\d/)[0]); if(s >= 9) return s + ' 分 (IV 级：重度心衰)'; if(s >= 7) return s + ' 分 (III 级：中度心衰)'; if(s >= 3) return s + ' 分 (II 级：轻度心衰)'; return s + ' 分 (I 级：无临床症状)'; }",
    "计算公式": "Modified Ross Score = 喂养评分 + 呼吸评分 + 心率评分 + 肝大评分",
    "公式解读": "决策逻辑：1. 0-2分为 I 级；2. 3-6分为 II 级；3. 7-9分为 III 级；4. 10-12分为 IV 级。Ross 评分越高，围手术期风险及病死率越高。",
    "参考范围": "适用于 0-12 岁儿童，尤其是婴儿期先天性心脏病患者",
    "健康建议": "function(res, v){ if(res.includes('IV 级') || res.includes('III 级')){ return '【紧急响应】患儿处于失代偿期心衰！1. 立即入 PICU 或心脏重症监护室；2. 严格限制液体入量，给予强心（地高辛/米力农）、利尿（呋塞米）治疗；3. 评估外科手术或介入封堵指征。'; } if(res.includes('II 级')){ return '【临床干预】提示轻度心衰。1. 调整喂养方式（少量多次，高热卡配方）；2. 门诊或住院口服抗心衰药物；3. 每 2-4 周复查超声心动图。'; } return '【日常监测】目前心功能尚可代偿。建议：继续原发病治疗，监测体重增长，按计划随访。'; }",
    "category": "儿科学",
    "适用人群": "先天性心脏病、心肌病或心肌炎患儿",
    "clinical_scenario": "先天性心脏病术前风险评估及心衰治疗方案制定"
  },
  {
    "id": "ped_peld_score",
    "title": "儿童终末期肝病评分 (PELD)",
    "version": "1.0",
    "输出": "肝移植优先级及 3 个月预后评估",
    "输入": [
      {
        "name": "age_1y",
        "label": "1. 年龄是否 < 1 岁",
        "type": "checkbox"
      },
      {
        "name": "tbil",
        "label": "2. 总胆红素 (TBil, mg/dL)",
        "type": "number",
        "placeholder": "例如：15"
      },
      {
        "name": "inr",
        "label": "3. 凝血酶原时间国际标准比值 (INR)",
        "type": "number",
        "placeholder": "例如：2.1"
      },
      {
        "name": "alb",
        "label": "4. 血清白蛋白 (Alb, g/dL)",
        "type": "number",
        "placeholder": "例如：2.5"
      },
      {
        "name": "growth",
        "label": "5. 生长发育迟缓 (身高/体重低于同性别年龄第 2 百分位)",
        "type": "checkbox"
      }
    ],
    "计算结果": "function(v){ var age_val = v.age_1y ? 0.436 : 0; var alb_val = -0.687 * Math.log(v.alb || 1); var tbil_val = 0.480 * Math.log(v.tbil || 1); var inr_val = 1.857 * Math.log(v.inr || 1); var growth_val = v.growth ? 0.667 : 0; var score = (age_val + alb_val + tbil_val + inr_val + growth_val) * 10; var final_s = Math.round(score); if(final_s >= 25) return final_s + ' 分 (极高危：建议紧急肝移植评估)'; if(final_s >= 15) return final_s + ' 分 (中高危：需密切监测及强化支持)'; return final_s + ' 分 (低危：暂行内科综合治疗)'; }",
    "计算公式": "PELD = 10 × [0.436(年龄<1岁) - 0.687ln(Alb) + 0.480ln(TBil) + 1.857ln(INR) + 0.667(生长迟缓)]",
    "公式解读": "决策逻辑：1. PELD 评分越高，预示 3 个月内死亡风险越大；2. <1 岁及生长迟缓是儿科特有的风险加权项；3. 计算值可为负数，分值越小风险越低。",
    "参考范围": "评分 ≥ 20 分通常作为考虑肝移植的重要参考点",
    "健康建议": "function(res, v){ if(res.includes('极高危')){ return '【紧急响应】PELD 评分显示患儿肝衰竭进展迅速。1. 立即上报器官移植中心进行备案登记；2. 预防肝性脑病、食管静脉曲张出血；3. 维持内环境及凝血功能稳定，等待供体。'; } if(res.includes('中高危')){ return '【临床干预】提示肝功能失代偿。1. 每 1-2 周复查肝肾功能及 INR；2. 强化营养支持（高热卡、高支链氨基酸饮食）；3. 处理腹水及电解质紊乱。'; } return '【日常监测】目前肝功能尚在可控范围。建议：每 1-3 个月随访评估，动态计算 PELD 评分演变。'; }",
    "category": "儿科学",
    "适用人群": "12 岁以下慢性肝病及肝衰竭患儿",
    "clinical_scenario": "肝移植优先级排序及慢性肝病严重度定量评估"
  },
  {
    "id": "jones_criteria_2015",
    "title": "风湿热 Jones 诊断标准 (2015 修订版)",
    "version": "1.0",
    "输出": "诊断分层及治疗决策",
    "输入": [
      {
        "name": "risk_strata",
        "label": "1. 流行病学风险分层",
        "type": "select",
        "options": [
          "低风险人群",
          "中高风险人群 (我国多数地区建议参考此项)"
        ]
      },
      {
        "name": "major",
        "label": "2. 主要表现 (Major Criteria)",
        "type": "checkbox_group",
        "options": [
          "心脏炎 (临床或亚临床超声表现)",
          "多关节炎 (低风险人群)",
          "单关节炎或关节痛 (仅限中高风险人群)",
          "舞蹈症 (Sydenham Chorea)",
          "环形红斑",
          "皮下结节"
        ]
      },
      {
        "name": "minor",
        "label": "3. 次要表现 (Minor Criteria)",
        "type": "checkbox_group",
        "options": [
          "关节痛 (若主要表现已选关节炎则不计)",
          "发热 (低风险≥38.5℃, 中高风险≥38℃)",
          "血沉 (ESR) 增快",
          "C反应蛋白 (CRP) 升高",
          "P-R 间期延长 (除外心脏炎)"
        ]
      },
      {
        "name": "gas_evidence",
        "label": "4. 前驱 A 组链球菌 (GAS) 感染证据 (必备条件)",
        "type": "select",
        "options": [
          "无证据",
          "ASO 滴度升高",
          "咽拭子培养阳性",
          "近期猩红热史"
        ]
      }
    ],
    "计算结果": "function(v){ if(v.gas_evidence === '无证据') return '排除诊断：缺乏链球菌感染证据 (必备条件)'; var major_count = v.major ? v.major.length : 0; var minor_count = v.minor ? v.minor.length : 0; if(major_count >= 2 || (major_count === 1 && minor_count >= 2)) return '确诊：初发风湿热 (满足 2主 或 1主+2次)'; return '疑似：指标不足，建议动态观察'; }",
    "计算公式": "基于 AHA 2015 修订版主要/次要指标组合逻辑",
    "公式解读": "决策逻辑：1. 链球菌感染证据是诊断基石；2. 2015版引入了亚临床心脏炎(多普勒超声可见)作为主要指标；3. 中高风险人群的单关节炎也可计入主要指标。",
    "参考范围": "复发性风湿热判定需 2主、1主+2次 或 3次次要指标",
    "健康建议": "function(res, v){ if(res.includes('确诊')){ return '【临床干预】1. 根除链球菌：首选苄星青霉素 G 肌肉注射；2. 抗炎治疗：水杨酸类（单纯关节炎）或糖皮质激素（心脏炎）；3. 预防复发：需进行长期的二级预防（青霉素）；4. 绝对卧床休息。'; } return '【临床建议】虽暂不满足诊断，但需密切监测心脏杂音及关节表现。建议 1-2 周后复查超声心动图及炎症指标。'; }",
    "category": "儿科学",
    "适用人群": "疑似风湿热的儿童及青少年",
    "clinical_scenario": "急性链球菌感染后多系统受累评估及二级预防决策"
  },
  {
    "id": "peritonitis_classification_tree",
    "title": "腹膜炎临床分类及严谨性评估",
    "version": "1.0",
    "输出": "腹膜炎类别判定及风险预后",
    "输入": [
      {
        "name": "origin",
        "label": "1. 感染来源判定",
        "type": "select",
        "options": [
          "无腹腔原发病灶 (原发性)",
          "存在脏器穿孔/炎症扩散 (继发性)",
          "手术后持续/耐药感染 (第三类)"
        ]
      },
      {
        "name": "extent",
        "label": "2. 累及范围",
        "type": "select",
        "options": [
          "局限性 (局部压痛/包块)",
          "弥漫性 (全腹肌紧张/反跳痛)"
        ]
      },
      {
        "name": "fluid_nature",
        "label": "3. 腹腔渗出液性质 (穿刺/术中)",
        "type": "select",
        "options": [
          "浆液性/草黄色",
          "脓性/浑浊",
          "粪性 (极高危)"
        ]
      }
    ],
    "计算结果": "function(v){ if(v.origin.includes('原发性')) return '原发性腹膜炎 (建议内科治疗)'; if(v.fluid_nature.includes('粪性') || v.extent.includes('弥漫性')) return '继发性弥漫性腹膜炎 (高危：外科急诊)'; return '继发性局限性腹膜炎 (中危：密切监测/择期手术)'; }",
    "计算公式": "基于《儿科学》第九版及外科 MPI 权重逻辑",
    "公式解读": "决策逻辑：1. 原发性 vs 继发性决定了治疗路径（内科 vs 外科）；2. 弥漫性 vs 局限性决定了手术的紧急程度；3. 粪性渗出意味着肠穿孔严重，病死率显著升高。",
    "参考范围": "MPI 评分 > 26 分预示死亡风险 > 40%",
    "健康建议": "function(res, v){ if(res.includes('弥漫性') || res.includes('外科')){ return '【紧急外科决策】1. 立即禁食、胃肠减压；2. 建立大口径静脉通路扩容；3. 尽早行剖腹探查术，清除感染源；4. 联合应用针对革兰氏阴性菌及厌氧菌的抗生素。'; } return '【临床监控】1. 密切观察腹部体征变化；2. 若为原发性，给予足量有效抗生素；3. 若局限性脓肿形成，可考虑超声引导下穿刺引流。'; }",
    "category": "儿科学",
    "适用人群": "急腹症患儿",
    "clinical_scenario": "儿科急诊预检、小儿外科术前分流"
  },
  {
    "id": "ped_resuscitation_drugs",
    "title": "儿科复苏药物及容量决策系统 (PALS 标准)",
    "version": "1.0",
    "输出": "精确给药剂量及复苏干预决策",
    "输入": [
      {
        "name": "weight",
        "label": "患儿估计/实测体重 (kg)",
        "type": "number",
        "placeholder": "10"
      },
      {
        "name": "scenario",
        "label": "临床紧急场景",
        "type": "select",
        "options": [
          "心跳骤停 (PEA/室颤/停搏)",
          "低血容量休克 (扩容)",
          "严重过敏反应 (Anaphylaxis)",
          "低血糖/新生儿复苏"
        ]
      },
      {
        "name": "route",
        "label": "给药途径",
        "type": "select",
        "options": [
          "静脉/骨通院 (IV/IO)",
          "气管内 (ET)"
        ]
      }
    ],
    "计算结果": "function(v){ var w = v.weight; if(v.scenario.includes('心跳骤停')){ if(v.route === 'IV/IO') return '肾上腺素 (1:10000): ' + (w * 0.01).toFixed(2) + ' mg (即 ' + (w * 0.1).toFixed(1) + ' mL)'; return '肾上腺素 (1:1000): ' + (w * 0.1).toFixed(1) + ' mg (即 ' + (w * 0.1).toFixed(1) + ' mL)'; } if(v.scenario.includes('休克')) return '等张晶体液 (生理盐水): ' + (w * 20).toFixed(0) + ' mL (20mL/kg 快速推注)'; if(v.scenario.includes('过敏')) return '肾上腺素 (1:1000) 肌注: ' + (w * 0.01).toFixed(2) + ' mg (最大 0.5mg)'; return '需结合具体临床表现判定'; }",
    "计算公式": "基于 PALS/NRP 2020-2025 国际复苏指南剂量标准",
    "公式解读": "决策逻辑：1. 肾上腺素心肺复苏剂量恒定为 0.01 mg/kg；2. 气管内给药剂量需放大 10 倍 (0.1 mg/kg)；3. 休克扩容首选 20mL/kg。注意：1:10000 稀释液是儿科复苏的标准浓度。",
    "参考范围": "肾上腺素每 3-5 分钟重复一次",
    "健康建议": "function(res, v){ if(res.includes('肾上腺素')){ return '【紧急响应】1. 立即开始高质量 CPR (按压深度 1/3 胸廓)；2. 尽早建立 IV/IO 通路；3. 若为可电击心律，电击能量首选 2J/kg。'; } if(res.includes('等张晶体液')){ return '【复苏决策】1. 15-20 分钟内快速推注；2. 观察肺部啰音以防容量负荷过重；3. 若 2-3 次扩容无效，考虑启动血管活性药物。'; } return '密切监测生命体征，确保气道通畅。'; }",
    "category": "儿科学",
    "适用人群": "儿科危急重症患儿",
    "clinical_scenario": "心肺复苏 (CPR)、休克抢救及严重过敏分流"
  },
  {
    "id": "phoenix_sepsis_2024",
    "title": "Phoenix 儿童脓毒症及脓毒性休克诊断标准",
    "version": "1.0",
    "发布日期": "2024年2月",
    "输出": "脓毒症/休克判定及临床路径",
    "输入": [
      {
        "name": "infection",
        "label": "1. 确诊或疑似感染",
        "type": "checkbox"
      },
      {
        "name": "respiratory",
        "label": "2. 呼吸系统得分 (PaO2/FiO2 或 SpO2/FiO2 或 机械通气)",
        "type": "select",
        "options": [
          "正常 (0分)",
          "低氧血症/辅助通气 (1-3分)"
        ]
      },
      {
        "name": "cardiovascular",
        "label": "3. 心血管系统得分 (血压/乳酸/血管活性药物)",
        "type": "select",
        "options": [
          "正常 (0分)",
          "需升压药/高乳酸 (1-6分)"
        ]
      },
      {
        "name": "coagulation",
        "label": "4. 凝血系统得分 (血小板 < 100/D-二聚体/纤维蛋白原)",
        "type": "select",
        "options": [
          "正常 (0分)",
          "异常 (1分)"
        ]
      },
      {
        "name": "neurological",
        "label": "5. 神经系统得分 (GCS 评分/瞳孔)",
        "type": "select",
        "options": [
          "正常 (0分)",
          "GCS ≤ 10 或 瞳孔异常 (1分)"
        ]
      }
    ],
    "计算结果": "function(v){ if(!v.infection) return '非脓毒症：未识别到感染证据'; var s = 0; s += parseInt(v.respiratory.match(/\\d/)[0] || 0); s += parseInt(v.cardiovascular.match(/\\d/)[0] || 0); s += parseInt(v.coagulation.match(/\\d/)[0] || 0); s += parseInt(v.neurological.match(/\\d/)[0] || 0); var is_shock = v.cardiovascular.includes('1-6分'); if(s >= 2){ if(is_shock) return s + ' 分 (Phoenix 脓毒性休克：严重威胁生命)'; return s + ' 分 (Phoenix 脓毒症：存在器官功能障碍)'; } return s + ' 分 (未达脓毒症诊断标准，需动态监测)'; }",
    "计算公式": "Phoenix 评分 = 呼吸 + 心血管 + 凝血 + 神经 (4大维度累加)",
    "公式解读": "决策逻辑：1. 核心判定：评分 ≥ 2 且有感染即诊断为脓毒症；2. 特殊逻辑：若 2 分中包含心血管评分，则直接判定为“脓毒性休克”。",
    "参考范围": "该标准适用于全球不同资源环境下的儿科医疗机构",
    "健康建议": "function(res, v){ if(res.includes('休克')){ return '【极高危决策】1. 1小时内启动脓毒症集束化治疗(Bundle)；2. 快速容量复苏(20mL/kg)；3. 尽早使用血管活性药物(如去甲肾上腺素/肾上腺素)；4. 广谱抗生素经验性覆盖。'; } if(res.includes('脓毒症')){ return '【高危决策】1. 立即收入 PICU 或重症监护单元；2. 完善病原学培养；3. 针对受损器官（呼吸/凝血）进行专项支持。'; } return '【临床建议】密切监测生命体征，每 2-4 小时重新评估 Phoenix 评分，严防病情突变。'; }",
    "category": "儿科学",
    "适用人群": "0 - 18 岁疑似感染患儿",
    "clinical_scenario": "PICU 脓毒症筛查、急诊严重感染风险分层"
  },
  {
    "id": "phoenix_sepsis_score_fixed",
    "title": "菲尼克斯儿科脓毒症评分 (Phoenix)",
    "version": "2.0",
    "输出": "器官功能障碍总分及分级",
    "输入": [
      {
        "name": "pao2_fio2",
        "label": "1. 呼吸: PaO2/FiO2 (或 SpO2/FiO2)",
        "type": "number",
        "placeholder": "正常 > 400"
      },
      {
        "name": "vasoactive_count",
        "label": "2. 心血管: 血管活性药物种类数",
        "type": "select",
        "options": [
          "0 种",
          "1 种",
          "2 种",
          "≥ 3 种"
        ]
      },
      {
        "name": "lactate",
        "label": "3. 心血管: 血乳酸水平 (mmol/L)",
        "type": "number",
        "placeholder": "正常 < 2.0"
      },
      {
        "name": "platelets",
        "label": "4. 血液: 血小板计数 (×10^9/L)",
        "type": "number",
        "placeholder": "200"
      },
      {
        "name": "coag_status",
        "label": "5. 血液: INR / D-二聚体 / 纤维蛋白原异常",
        "type": "select",
        "options": [
          "指标均正常",
          "任一指标异常 (INR>2.0/D-二聚体升高/纤原降低)"
        ]
      },
      {
        "name": "gcs",
        "label": "6. 神经: Glasgow 昏迷评分 (GCS)",
        "type": "number",
        "placeholder": "满分 15"
      },
      {
        "name": "pupil_status",
        "label": "7. 神经: 瞳孔对光反射",
        "type": "select",
        "options": [
          "双侧正常",
          "双侧均固定/散大 (无反射)"
        ]
      }
    ],
    "计算结果": "function(v){ var s = 0; if(v.pao2_fio2 < 100) s+=3; else if(v.pao2_fio2 < 200) s+=2; else if(v.pao2_fio2 < 400) s+=1; if(v.vasoactive_count === '1 种') s+=1; else if(v.vasoactive_count === '2 种') s+=2; else if(v.vasoactive_count === '≥ 3 种') s+=3; if(v.lactate >= 11) s+=2; else if(v.lactate >= 5) s+=1; if(v.platelets < 100) s+=1; if(v.coag_status.includes('异常')) s+=1; if(v.gcs <= 9) s+=1; if(v.pupil_status.includes('固定')) s+=1; return s; }",
    "计算公式": "呼吸(0-3)+心血管(0-6)+血液(0-2)+神经(0-2)",
    "公式解读": "决策逻辑：1. 总分 ≥ 2 分确诊脓毒症；2. 若这 2 分包含心血管分值，确诊为脓毒性休克。",
    "参考范围": "适用于全球儿科环境，不再区分资源水平",
    "健康建议": "function(res, v){ if(res >= 2) { var isShock = (v.vasoactive_count !== '0 种' || v.lactate >= 5); if(isShock) return '【紧急：脓毒性休克】评分' + res + '分。患儿已进入休克状态，立即启动扩容、强心及血管活性药物，1小时内使用抗生素。'; return '【确诊：儿科脓毒症】评分' + res + '分。存在器官功能障碍，建议立即收入 PICU 强化监护。'; } return '评分' + res + '分。目前未达诊断标准，但需每 4-6 小时动态复评，警惕病情突变。'; }",
    "category": "儿科学",
    "适用人群": "0-18岁疑似感染患儿",
    "clinical_scenario": "PICU/急诊脓毒症快速筛查与分流"
  },
  {
    "id": "modified_barkovich_hie",
    "title": "改良 Barkovich 新生儿 HIE MRI 分类",
    "version": "1.1",
    "输出": "脑损伤模式分级及预后评估",
    "输入": [
      {
        "name": "bgt_score",
        "label": "1. 基底节与丘脑 (BGT) 损伤",
        "type": "select",
        "options": [
          "0: 正常",
          "1: 仅见异常信号 (T1/T2) 局限于基底节/丘脑",
          "2: 伴内囊后肢 (PLIC) 异常信号",
          "3: 伴皮层受累 (尤其是中央前后回)"
        ]
      },
      {
        "name": "ws_score",
        "label": "2. 分水岭 (Watershed) 损伤",
        "type": "select",
        "options": [
          "0: 正常",
          "1: 仅见皮层下白质异常信号",
          "2: 累及皮层 (分水岭区)",
          "3: 伴广泛皮层受累 (非局限于分水岭)"
        ]
      },
      {
        "name": "is_global",
        "label": "3. 是否存在全脑受累 (Global Injury)",
        "type": "checkbox"
      }
    ],
    "计算结果": "function(v){ var b = parseInt(v.bgt_score.charAt(0)); var w = parseInt(v.ws_score.charAt(0)); if(v.is_global) return '全脑受累 (Global)：预后极差，多器官受累可能性大'; if(b >= 2) return 'BGT 模式 ' + b + ' 级：高风险 (中重度损伤，常伴运动功能障碍)'; if(w >= 2) return '分水岭模式 ' + w + ' 级：中风险 (可能影响认知及视觉发育)'; if(b === 1 || w === 1) return '轻微损伤：低风险 (需长期随访)'; return 'MRI 表现正常：预后良好'; }",
    "计算公式": "Barkovich BGT/W/Total Score 组合评定法",
    "公式解读": "决策逻辑：1. BGT 模式反映急性完全性缺氧，PLIC 消失是神经发育不良的强预测因子；2. 分水岭模式反映慢性部分性缺氧；3. 评分越高，神经后遗症概率越高。",
    "参考范围": "建议在出生后 3-5 天（水肿高峰期）进行 MRI 检查",
    "健康建议": "function(res, v){ if(res.includes('Global') || res.includes('BGT 模式 3')){ return '【高危决策】1. 提示存在严重脑损伤及远期运动障碍风险；2. 建议尽早启动早期干预与康复训练；3. 需神经科医生深度评估抗癫痫方案。'; } if(res.includes('2')){ return '【中危决策】1. 需密切关注患儿大运动及认知发育；2. 建议定期进行 Bayley 婴幼儿发育量表评估；3. 1岁左右复查脑部 MRI。'; } return '【日常建议】虽然影像学风险较低，但 HIE 患儿仍需在儿科神经门诊定期随访至学龄期。'; }",
    "category": "儿科学",
    "适用人群": "疑似 HIE 的足月新生儿",
    "clinical_scenario": "新生儿期 HIE 严重度判定及远期神经发育结局预测"
  },
  {
    "id": "lyte_deficit",
    "title": "各种损失液每100ml所需补水和电解质液量",
    "输出": "补充配比",
    "输入": [
      {
        "name": "loss",
        "label": "丢失途径",
        "type": "select",
        "options": [
          "胃液",
          "小肠液",
          "腹泻"
        ]
      }
    ],
    "计算结果": "function(v){return v.loss==='胃液'?'高氯低钠，多补生理盐水':v.loss==='小肠液'?'等渗液为主':'偏碱性等渗液，注意补钾';}",
    "计算公式": "按体液成分经验配比",
    "公式解读": "精确纠正不同消化道引流引发的失衡",
    "参考范围": "依据引流量1:1补充",
    "健康建议": "function(res, v){ if(res.includes('高氯')) return '胃液的大量丢失（如频繁呕吐、先天性肥厚性幽门狭窄）极易导致严重的低钾低氯性代谢性碱中毒。静脉补液必须以生理盐水为基底，并务必及时、足量地补充氯化钾。'; if(res.includes('等渗液为主')) return '小肠液的丢失多表现为经典的等渗性脱水。临床应通过补充平衡盐溶液或林格氏液来等额恢复血管内血容量。'; return '腹泻等肠道下段液体丢失极易引发代谢性酸中毒及低钾血症。补液配方中需常规加入适量碳酸氢钠，并在患者排尿后强力补钾。'; }",
    "category": "儿科学",
    "适用人群": "腹部术后儿童",
    "临床场景": "小儿外科"
  },
  {
    "id": "pediatric_gcs_system",
    "title": "改良儿童 Glasgow 昏迷评分 (pGCS)",
    "version": "1.0",
    "输出": "意识状态总分及损伤程度分级",
    "输入": [
      {
        "name": "is_infant",
        "label": "1. 年龄分层",
        "type": "select",
        "options": [
          "婴儿 (≤ 2 岁)",
          "儿童 (> 2 岁)"
        ]
      },
      {
        "name": "eye_opening",
        "label": "2. 睁眼反应 (E)",
        "type": "select",
        "options": [
          "4分: 自发性睁眼",
          "3分: 语言刺激后睁眼",
          "2分: 疼痛刺激后睁眼",
          "1分: 无反应"
        ]
      },
      {
        "name": "verbal_response",
        "label": "3. 语言反应 (V)",
        "type": "select",
        "options": [
          "5分: (婴儿)咿呀作语；(儿童)对答切题",
          "4分: (婴儿)哭声可安抚；(儿童)对答不切题",
          "3分: (婴儿)持续哭闹/易激惹；(儿童)词语不当",
          "2分: (婴儿)呻吟/疼痛有声；(儿童)含糊不清",
          "1分: 无反应"
        ]
      },
      {
        "name": "motor_response",
        "label": "4. 运动反应 (M)",
        "type": "select",
        "options": [
          "6分: (婴儿)自发运动；(儿童)按指令动作",
          "5分: 对疼痛刺激能定位",
          "4分: 痛避 (疼痛刺激下肢体回缩)",
          "3分: 去皮层强直 (去皮层屈曲)",
          "2分: 去大脑强直 (去大脑伸展)",
          "1分: 无反应"
        ]
      }
    ],
    "计算结果": "function(v){ var e = parseInt(v.eye_opening.match(/\\d/)[0]); var ver = parseInt(v.verbal_response.match(/\\d/)[0]); var m = parseInt(v.motor_response.match(/\\d/)[0]); var total = e + ver + m; if(total <= 8) return total + ' 分 (重度损伤/昏迷：需立即插管治疗)'; if(total <= 12) return total + ' 分 (中度损伤：需严密监测)'; return total + ' 分 (轻度损伤：观察随访)'; }",
    "计算公式": "pGCS = E + V + M (针对婴儿发育阶段进行语言及运动修正)",
    "公式解读": "决策逻辑：1. 满分15分，最低3分；2. 8分是儿科气道保护的临界线（GCS ≤ 8 则插管）；3. 对于插管患儿，得分记录为 E+M+T(插管)。",
    "参考范围": "得分下降 ≥ 2 分预示病情急性恶化",
    "健康建议": "function(res, v){ if(res.includes('重度')){ return '【紧急医疗决策】患儿处于昏迷状态！1. 立即评估气道，必要时行气管插管；2. 监测颅内压 (ICP)；3. 头部 CT 检查以排查颅内出血或水肿；4. 每小时复评 pGCS。'; } if(res.includes('中度')){ return '【临床干预】提示存在明显神经系统受累。1. 收入神经外科或 PICU；2. 严密观察瞳孔变化及生命体征；3. 完善头颅影像学评估。'; } return '【日常监测】目前意识状态尚稳。建议继续观察精神状态，防止继发性脑损伤。'; }",
    "category": "儿科学",
    "适用人群": "存在意识障碍或颅脑损伤的儿童",
    "clinical_scenario": "小儿急性颅脑损伤评估、脑炎及代谢性脑病意识监控"
  },
  {
    "id": "ped_pef_prediction_tree",
    "title": "儿童呼气流量峰值 (PEF) 预计值及分度",
    "version": "1.0",
    "输出": "PEF 预计值 (L/min) 及哮喘预警分区",
    "输入": [
      {
        "name": "height",
        "label": "1. 患儿身高 (cm)",
        "type": "number",
        "placeholder": "130"
      },
      {
        "name": "gender",
        "label": "2. 性别",
        "type": "select",
        "options": [
          "男",
          "女"
        ]
      },
      {
        "name": "measured_pef",
        "label": "3. 实测 PEF 值 (L/min)",
        "type": "number",
        "placeholder": "200"
      }
    ],
    "计算结果": "function(v){ var h = v.height; var pred = 0; if(v.gender === '男') { pred = (h * 5.29) - 427; } else { pred = (h * 4.94) - 399; } if(pred < 50) pred = (h - 100) * 5 + 100; var ratio = v.measured_pef / pred; if(ratio >= 0.8) return '预计值: ' + Math.round(pred) + ' (绿区：控制良好)'; if(ratio >= 0.6) return '预计值: ' + Math.round(pred) + ' (黄区：警告/加强用药)'; return '预计值: ' + Math.round(pred) + ' (红区：极高危/立即急诊)'; }",
    "计算公式": "基于中国儿童 PEF 回归方程 (男: 5.29*H-427; 女: 4.94*H-399)",
    "公式解读": "决策逻辑：1. 绿区 (≥80%)：维持当前治疗；2. 黄区 (60-79%)：提示气道受限，需增加吸入药物；3. 红区 (<60%)：有窒息风险。",
    "参考范围": "适用于 5 岁以上能配合吹气动作的患儿",
    "健康建议": "function(res, v){ if(res.includes('红区')){ return '【紧急医疗决策】1. 立即吸入短效 β2 受体激动剂 (SABA)；2. 尽快前往医院急诊；3. 观察是否存在端坐呼吸或发绀。'; } if(res.includes('黄区')){ return '【临床干预】提示哮喘发作预警。1. 按哮喘行动计划增加药物剂量；2. 寻找并脱离过敏原；3. 1小时后复测 PEF，若无改善需就医。'; } return '【日常监测】目前控制良好。请继续记录 PEF 日记，维持常规预防性药物治疗。'; }",
    "category": "儿科学",
    "适用人群": "5 - 14 岁支气管哮喘患儿",
    "clinical_scenario": "哮喘家庭自我监测、门诊气道反应性初步评估"
  },
  {
    "id": "gest_age",
    "title": "简易胎龄评估量表",
    "输出": "早产/足月",
    "输入": [
      {
        "name": "crease",
        "label": "足底纹理",
        "type": "select",
        "options": [
          "无纹",
          "前1/3",
          "遍及足底"
        ]
      }
    ],
    "计算结果": "function(v){return v.crease==='无纹'?'极早产儿':v.crease==='前1/3'?'近足月儿':'足月儿';}",
    "计算公式": "体征快速查体",
    "公式解读": "缺乏专业设备时的极简胎龄判断",
    "参考范围": "足月儿体征丰满",
    "健康建议": "function(res, v){ if(res === '极早产儿') return '体征高度提示极早产儿。此类患儿脏器发育极其原始，出生后面临严重的呼吸窘迫综合征及致命性体温丧失风险，必须即刻保暖并转运入高级别NICU保温箱。'; if(res === '近足月儿') return '评估为晚期早产儿或近足月儿。虽然体型与足月儿相仿，但其呼吸中枢及肝脏代谢仍偏弱，发生低血糖和严重黄疸的几率显著偏高，需按早产儿规范加强病房监护。'; return '体态特征完全符合足月儿标准，各项生理机能基本成熟，可进行常规的母婴同室基础护理。'; }",
    "category": "儿科学",
    "适用人群": "新生儿",
    "临床场景": "急产现场"
  },
  {
    "id": "kocher_criteria_septic_hip",
    "title": "Kocher 儿童化脓性髋关节炎诊断标准",
    "version": "1.0",
    "输出": "化脓性关节炎概率及处理决策",
    "输入": [
      {
        "name": "non_weight_bearing",
        "label": "1. 患侧肢体不能负重 (无法行走/站立)",
        "type": "checkbox"
      },
      {
        "name": "fever",
        "label": "2. 发热 (口腔温 > 38.5℃)",
        "type": "checkbox"
      },
      {
        "name": "esr",
        "label": "3. 血沉 (ESR) 增快 (≥ 40 mm/h)",
        "type": "checkbox"
      },
      {
        "name": "wbc",
        "label": "4. 外周血白细胞计数 (WBC > 12.0 × 10⁹/L)",
        "type": "checkbox"
      }
    ],
    "计算结果": "function(v){ var s = 0; if(v.non_weight_bearing) s++; if(v.fever) s++; if(v.esr) s++; if(v.wbc) s++; var prob = '0.2%'; if(s === 1) prob = '3.0%'; if(s === 2) prob = '40.0%'; if(s === 3) prob = '93.1%'; if(s === 4) prob = '99.6%'; return s + ' 项阳性 (化脓性关节炎概率：' + prob + ')'; }",
    "计算公式": "Kocher 四项临床及实验室指标累加评分",
    "公式解读": "决策逻辑：1. 0项阳性：概率极低(<1%)；2. 3项阳性：概率突增至93%；3. 4项阳性：几乎确定为化脓性，需紧急手术介入。",
    "参考范围": "近期研究建议结合 CRP > 20 mg/L 作为第五项修订指标以提高特异性",
    "健康建议": "function(res, v){ if(res.includes('93%') || res.includes('99%')){ return '【紧急外科决策】1. 立即收入院并禁食；2. 紧急行超声引导下关节穿刺抽吸；3. 若抽出脓液，立即行关节切开引流或关节镜冲洗；4. 启动静脉经验性抗生素治疗。'; } if(res.includes('40%')){ return '【临床高度疑似】1. 密切监测生命体征及疼痛变化；2. 完善髋关节超声检查观察积液情况；3. 若 6-12 小时内症状加重，按化脓性流程处理。'; } return '【临床建议】更倾向于一过性滑膜炎。建议：1. 患肢制动/卧床休息；2. 口服非甾体抗炎药；3. 门诊随访，若出现高热或不能行走及时返诊。'; }",
    "category": "儿科学",
    "适用人群": "急性髋关节疼痛且伴跛行的儿童",
    "clinical_scenario": "儿科急诊髋关节疼痛鉴别诊断、急诊手术指征判定"
  },
  {
    "id": "fluid_tonicity",
    "title": "临床常用液体成分及张力",
    "输出": "张力描述",
    "输入": [
      {
        "name": "type",
        "label": "液体类型",
        "type": "select",
        "options": [
          "0.9% NaCl",
          "5% GNS",
          "4:3:2液(2/3张)"
        ]
      }
    ],
    "计算结果": "function(v){return v.type.includes('0.9%')?'等张':v.type.includes('5%')?'葡萄糖入血代谢视作无张力':'常用于重度脱水扩容';}",
    "计算公式": "含钠/钾等有效渗透分子占比",
    "公式解读": "指导脱水不同性质（等渗/高渗/低渗）的纠正",
    "参考范围": "等张用于扩容，1/2或1/3用于维持",
    "健康建议": "function(res, v){ if(res === '等张') return '生理盐水(0.9% NaCl)属于等张液体。由于其水分不易渗入细胞内，能最大程度地扩充血管内体积，因此是重度脱水及休克患者首剂快速液体复苏的唯一金标准液体。'; if(res.includes('无张力')) return '5%葡萄糖溶液在输入体内后，葡萄糖分子会被细胞迅速摄取代谢，其本质等同于向血管内输入单纯的“无张力游离水”。严禁将其单独用于休克扩容！它仅适用于补充单纯的脱水(如高钠血症)。'; return '1/2张或2/3张等混合性张力液体，兼顾了渗透压稳定与水分补充，主要用于维持儿童每日的基础生理需要量，或缓慢补充累积的脱水损失量。'; }",
    "category": "儿科学",
    "适用人群": "需输液儿童",
    "临床场景": "儿科病房"
  },
  {
    "id": "target_ht",
    "title": "理想身高(遗传靶身高)",
    "输出": "预测终身高(cm)",
    "输入": [
      {
        "name": "fh",
        "label": "父亲身高(cm)",
        "type": "number",
        "placeholder": "175"
      },
      {
        "name": "mh",
        "label": "母亲身高(cm)",
        "type": "number",
        "placeholder": "160"
      },
      {
        "name": "gen",
        "label": "性别",
        "type": "select",
        "options": [
          "男孩",
          "女孩"
        ]
      }
    ],
    "计算结果": "function(v){return v.gen==='男孩'?Math.round((v.fh+v.mh+13)/2)+'+/-5':Math.round((v.fh+v.mh-13)/2)+'+/-5';}",
    "计算公式": "(父+母±13)/2",
    "公式解读": "依据父母基因粗略预测成年靶身高",
    "参考范围": "均值±5cm内",
    "健康建议": "function(res, v){ return '根据遗传潜能推算，该患儿成年后的理论靶身高约在 ' + res + ' cm 范围内。若患儿目前的生长曲线百分位显著跌破该目标值的下限，或者其实际的年生长速度持续小于5cm，强烈建议尽早前往儿童内分泌科完善骨龄测定及生长激素轴的全面评估，避免错过干预窗口。'; }",
    "category": "儿科学",
    "适用人群": "矮小症/儿童",
    "临床场景": "内分泌/儿保科"
  },
  {
    "id": "malinas_score_system",
    "title": "Malinas 临产转运风险评分 (急诊分娩评估)",
    "version": "1.0",
    "输出": "转运安全性判定及接生准备决策",
    "输入": [
      {
        "name": "parity",
        "label": "1. 生产次数 (Parity)",
        "type": "select",
        "options": [
          "0分: 初产妇",
          "1分: 经产妇 (1-2次)",
          "2分: 经产妇 (≥3次)"
        ]
      },
      {
        "name": "duration",
        "label": "2. 临产总时长 (Duration of Labor)",
        "type": "select",
        "options": [
          "0分: < 3 小时",
          "1分: 3 - 6 小时",
          "2分: > 6 小时"
        ]
      },
      {
        "name": "contraction_interval",
        "label": "3. 阵痛间隔时间 (Interval)",
        "type": "select",
        "options": [
          "0分: > 5 分钟",
          "1分: 3 - 5 分钟",
          "2分: < 3 分钟"
        ]
      },
      {
        "name": "rupture",
        "label": "4. 胎膜破裂 (Rupture of Membranes)",
        "type": "select",
        "options": [
          "0分: 未破膜",
          "1分: 刚刚破膜 (< 1小时)",
          "2分: 破膜已久 (> 1小时)"
        ]
      },
      {
        "name": "crowning",
        "label": "5. 宫口/着冠情况 (Presentation)",
        "type": "select",
        "options": [
          "0分: 宫口未开/无排便感",
          "1分: 宫口部分扩张",
          "2分: 见红/着冠/强烈排便感"
        ]
      }
    ],
    "计算结果": "function(v){ var s = 0; s += parseInt(v.parity.charAt(0)); s += parseInt(v.duration.charAt(0)); s += parseInt(v.contraction_interval.charAt(0)); s += parseInt(v.rupture.charAt(0)); s += parseInt(v.crowning.charAt(0)); if(s >= 7) return s + ' 分 (极高风险：即将分娩，禁止转运)'; if(s >= 5) return s + ' 分 (中高风险：转运需极其谨慎)'; return s + ' 分 (低风险：可安全转运)'; }",
    "计算公式": "Malinas Score = 产次 + 时长 + 间隔 + 破膜 + 宫口表现",
    "公式解读": "决策逻辑：1. 总分 < 5 分：可转运至就近医院；2. 5-6 分：转运途中随时可能分娩，需专业陪同；3. ≥ 7 分：胎头可能随时娩出，应原地准备接生。",
    "参考范围": "评分越高，分娩迫切性越高。重点关注经产妇且阵痛频繁者。",
    "健康建议": "function(res, v){ if(res.includes('即将分娩')){ return '【紧急避险决策】禁止搬运产妇！1. 立即呼叫二线支援并准备接生包；2. 监测胎心率及母体生命体征；3. 准备新生儿复苏设备（保暖、吸痰、氧气）。'; } if(res.includes('转运需谨慎')){ return '【临床分流】若医院距离极近可尝试，但救护车上必须配备接生人员及新生儿复苏囊；若距离远，建议就地观察宫口进展。'; } return '【转运决策】尽快转送至产科中心。转运途中监测阵痛频率，保持产妇左侧卧位。'; }",
    "category": "儿科学",
    "适用人群": "急诊环境中临产的孕妇",
    "clinical_scenario": "院前急救转运、非产科病房意外临产评估"
  },
  {
    "id": "ped_mpi_prognosis_tree",
    "title": "曼海姆腹膜炎指数 (MPI) 预后评估",
    "version": "1.0",
    "输出": "腹膜炎严重度评分及病死率预测",
    "输入": [
      {
        "name": "age_50",
        "label": "1. 年龄 (儿科逻辑：由于原量表设定为 >50岁计分，此处默认为 0)",
        "type": "select",
        "options": [
          "< 50 岁 (0分)",
          "≥ 50 岁 (5分)"
        ]
      },
      {
        "name": "gender",
        "label": "2. 性别 (女性增加风险点)",
        "type": "select",
        "options": [
          "男 (0分)",
          "女 (5分)"
        ]
      },
      {
        "name": "organ_fail",
        "label": "3. 器官功能衰竭 (呼吸/循环/肾脏受累)",
        "type": "select",
        "options": [
          "无 (0分)",
          "有 (7分)"
        ]
      },
      {
        "name": "malignancy",
        "label": "4. 合并恶性肿瘤 (如神经母细胞瘤等)",
        "type": "select",
        "options": [
          "无 (0分)",
          "有 (4分)"
        ]
      },
      {
        "name": "duration",
        "label": "5. 腹膜炎病程 > 24 小时",
        "type": "select",
        "options": [
          "≤ 24 小时 (0分)",
          "> 24 小时 (4分)"
        ]
      },
      {
        "name": "origin",
        "label": "6. 感染来源 (非大肠来源)",
        "type": "select",
        "options": [
          "大肠来源 (0分)",
          "非大肠来源 (4分)"
        ]
      },
      {
        "name": "extent",
        "label": "7. 腹膜炎范围",
        "type": "select",
        "options": [
          "局限性 (0分)",
          "弥漫性 (6分)"
        ]
      },
      {
        "name": "exudate",
        "label": "8. 渗出液性质",
        "type": "select",
        "options": [
          "清亮 (0分)",
          "浑浊/脓性 (6分)",
          "粪性 (12分)"
        ]
      }
    ],
    "计算结果": "function(v){ var s = 0; s += parseInt(v.age_50.match(/\\d/)[0]); s += parseInt(v.gender.match(/\\d/)[0]); s += parseInt(v.organ_fail.match(/\\d/)[0]); s += parseInt(v.malignancy.match(/\\d/)[0]); s += parseInt(v.duration.match(/\\d/)[0]); s += parseInt(v.origin.match(/\\d/)[0]); s += parseInt(v.extent.match(/\\d/)[0]); s += parseInt(v.exudate.match(/\\d/)[0]); if(s > 29) return s + ' 分 (极高危：预测病死率 > 50%)'; if(s >= 21) return s + ' 分 (中高危：预测病死率 20-30%)'; return s + ' 分 (低危：预测病死率 < 4%)'; }",
    "计算公式": "MPI = 年龄+性别+器官衰竭+肿瘤+时长+来源+范围+性质 (加权累加)",
    "公式解读": "决策逻辑：1. 核心红线为 26 分，超过此值预示预后极差；2. 粪性渗出液 (12分) 是单项最高权重，直接决定手术紧急度；3. 儿科需特别关注器官衰竭项。",
    "参考范围": "MPI 评分是判定是否需要行“计划性再次剖腹探查”的重要依据",
    "健康建议": "function(res, v){ if(res.includes('极高危')){ return '【紧急医疗决策】1. 立即入 PICU 进行强化监护；2. 启动最高级别经验性抗生素治疗；3. 评估是否有计划性再次手术探查的必要；4. 纠正严重内环境紊乱及休克。'; } if(res.includes('中高危')){ return '【临床干预】1. 充分引流并保持通畅；2. 密切监测炎症指标 (CRP/PCT) 趋势；3. 若 24-48 小时内病情未改善，需重新评估感染源控制。'; } return '【常规观察】1. 维持基础抗感染治疗；2. 监测肠功能恢复情况。'; }",
    "category": "儿科学",
    "适用人群": "疑似或确诊继发性腹膜炎的患儿",
    "clinical_scenario": "小儿外科急腹症预后分层、二次手术指征评估"
  },
  {
    "id": "mascc_fn_risk_score",
    "title": "MASCC 癌症伴发热性粒缺风险评分",
    "version": "1.0",
    "输出": "FN 风险分层及治疗路径决策",
    "输入": [
      {
        "name": "burden_of_illness",
        "label": "1. 疾病负担 (症状严重程度)",
        "type": "select",
        "options": [
          "无症状或轻微症状 (5分)",
          "中度症状 (3分)",
          "重度症状或低血压/脱水 (0分)"
        ]
      },
      {
        "name": "no_hypotension",
        "label": "2. 无低血压 (收缩压 > 90 mmHg)",
        "type": "checkbox",
        "weight": 5
      },
      {
        "name": "no_copd",
        "label": "3. 无慢性阻塞性肺疾病 (COPD)",
        "type": "checkbox",
        "weight": 4
      },
      {
        "name": "solid_tumor",
        "label": "4. 实体瘤 (或血液肿瘤且无既往真菌感染)",
        "type": "checkbox",
        "weight": 4
      },
      {
        "name": "no_dehydration",
        "label": "5. 无脱水 (无需静脉补液)",
        "type": "checkbox",
        "weight": 3
      },
      {
        "name": "outpatient_status",
        "label": "6. 发热时处于门诊状态",
        "type": "checkbox",
        "weight": 3
      }
    ],
    "计算结果": "function(v){ var s = 0; s += parseInt(v.burden_of_illness.match(/\\d/)[0]); if(v.no_hypotension) s += 5; if(v.no_copd) s += 4; if(v.solid_tumor) s += 4; if(v.no_dehydration) s += 3; if(v.outpatient_status) s += 3; if(v.age_less_60) s += 2; if(s >= 21) return s + ' 分 (低风险：预计并发症率 < 5%)'; return s + ' 分 (高风险：需强制住院治疗)'; }",
    "计算公式": "MASCC Score = 症状分值 + 各项生理指标权重加和",
    "公式解读": "决策逻辑：1. 总分 ≥ 21 为低风险；2. 分数越高，临床稳定性越好；3. 任何一项出现重度症状 (0分) 均预示可能存在感染性休克。",
    "参考范围": "适用于正在接受化疗且出现发热 (T > 38.3℃) 伴粒缺 (ANC < 0.5×10⁹/L) 的患者",
    "健康建议": "function(res, v){ if(res.includes('低风险')){ return '【门诊决策】1. 可考虑转为口服抗生素治疗（如环丙沙星+阿莫西林克拉维酸钾）；2. 需确保家庭观察条件良好且 1 小时内能返院；3. 24 小时内密切随访。'; } return '【住院决策】1. 立即收入院进行静脉广谱抗生素治疗（如碳青霉素类或四代头孢）；2. 完善血培养及病原学检查；3. 严密监测生命体征，预防脓毒性休克。'; }",
    "category": "儿科学",
    "适用人群": "化疗后发热性中性粒细胞减少 (FN) 患儿/成人",
    "clinical_scenario": "FN 患儿的住院/门诊分流、抗生素降阶梯治疗决策"
  },
  {
    "id": "uca_ucr",
    "title": "尿钙/尿肌酐比",
    "输出": "比值(mg/mg)",
    "输入": [
      {
        "name": "ca",
        "label": "尿钙(mg/dL)",
        "type": "number",
        "placeholder": "20"
      },
      {
        "name": "cr",
        "label": "尿肌酐(mg/dL)",
        "type": "number",
        "placeholder": "50"
      }
    ],
    "计算结果": "function(v){return Math.round(v.ca/v.cr*100)/100;}",
    "计算公式": "尿钙 / 尿肌酐",
    "公式解读": "评估高钙尿症的简便指标，替代24h尿液收集",
    "参考范围": "儿童<0.2 (婴儿可至0.8)",
    "健康建议": "function(res, v){ if(res > 0.2) return '随机尿钙/肌酐比值显著异常(>' + res + ')。这高度指向患儿存在特发性高钙尿症，是引发小儿不明原因的复发性肉眼血尿以及泌尿系微结石的头号元凶。建议患儿日常大幅增加纯水饮用量，严格控制钠盐摄入，若结石倾向严重可考虑使用噻嗪类利尿剂以减少尿钙过度排泄。'; return '比值处于健康儿童的正常生理参考界限内(<0.2)，暂不支持病理性高钙尿的诊断。'; }",
    "category": "儿科学",
    "适用人群": "血尿/结石儿童",
    "临床场景": "小儿肾内科"
  },
  {
    "id": "ped_hydroxyproline_index",
    "title": "尿羟脯氨酸指数 (Whitehead Index)",
    "version": "1.0",
    "输出": "蛋白质-能量营养不良 (PEM) 风险分级",
    "输入": [
      {
        "name": "u_hop",
        "label": "1. 尿羟脯氨酸浓度 (μmol/L 或 mg/L)",
        "type": "number",
        "placeholder": "测定值"
      },
      {
        "name": "u_cr",
        "label": "2. 尿肌酐浓度 (μmol/L 或 mg/L)",
        "type": "number",
        "placeholder": "测定值"
      },
      {
        "name": "weight",
        "label": "3. 患儿当前体重 (kg)",
        "type": "number",
        "placeholder": "实测体重"
      }
    ],
    "计算结果": "function(v){ var index = (v.u_hop / v.u_cr) * v.weight; var res = index.toFixed(2); if(res < 1.0) return res + ' (重度营养不良：生长严重受阻)'; if(res < 2.0) return res + ' (中度营养不良：需积极营养干预)'; if(res <= 5.0) return res + ' (理想范围：营养发育正常)'; return res + ' (数值偏高：需排查甲亢/骨病/生长高峰期)'; }",
    "计算公式": "尿羟脯氨酸指数 = [尿羟脯氨酸 (μmol) / 尿肌酐 (μmol/kg)] × 体重 (kg)",
    "公式解读": "决策逻辑：1. 该指数不受尿量误差影响；2. 指数 < 2.0 提示胶原代谢减慢，是蛋白质营养不足的早期信号；3. 婴儿期数值通常高于年长儿。",
    "参考范围": "正常儿童通常在 2.0 - 5.0 之间",
    "临床建议": "function(res, v){ if(res.includes('重度') || res.includes('中度')){ return '【决策：强化营养】1. 立即核查膳食中蛋白质及总热卡摄入；2. 增加优质蛋白（奶、蛋、肉）比例；3. 补充微量元素（尤其是维生素 C，其为羟化酶辅助因子）；4. 1个月后复测指数。'; } if(res.includes('偏高')){ return '【临床排查】1. 若患儿处于青春期生长加速期，数值升高属生理性；2. 排除甲状腺功能亢进或活动性佝偻病导致的骨转换加快。'; } return '【健康评价】当前蛋白质营养状态良好，维持均衡饮食即可。'; }",
    "category": "儿科学",
    "适用人群": "6个月 - 12岁疑似营养不良患儿",
    "clinical_scenario": "亚临床营养不良早期筛查、大范围儿童营养普查"
  },
  {
    "id": "pecarn",
    "title": "PECARN 小儿头外伤 CT 决策树",
    "输出": "决策建议",
    "输入": [
      {
        "name": "age_group",
        "label": "年龄分段",
        "type": "select",
        "options": [
          "< 2 岁",
          "≥ 2 岁"
        ]
      },
      {
        "name": "gcs",
        "label": "GCS 评分 <= 14 或 精神萎靡/不振",
        "type": "checkbox"
      },
      {
        "name": "frac_sign",
        "label": "存在颅骨骨折体征 (如前囟隆起/触及骨折缝/熊猫眼)",
        "type": "checkbox"
      },
      {
        "name": "loc",
        "label": "是否有意识丧失 (LOC)",
        "type": "checkbox"
      },
      {
        "name": "loc_time",
        "label": "意识丧失时长 > 5 秒 (若无LOC选否)",
        "type": "checkbox"
      },
      {
        "name": "mech",
        "label": "严重受伤机制 (如>1.5米高坠/车祸/重物撞击)",
        "type": "checkbox"
      },
      {
        "name": "vomit",
        "label": "存在呕吐症状",
        "type": "checkbox"
      },
      {
        "name": "behavior",
        "label": "家长主诉患儿行为异常 (如易激惹/嗜睡)",
        "type": "checkbox"
      },
      {
        "name": "hematoma",
        "label": "非额头部位的头皮血肿 (仅限<2岁)",
        "type": "checkbox"
      },
      {
        "name": "headache",
        "label": "主诉剧烈头痛 (仅限≥2岁)",
        "type": "checkbox"
      }
    ],
    "计算结果": "function(v){ if(v.gcs || v.frac_sign) return '高危 (风险约 4.4%)'; if(v.age_group === '< 2 岁'){ if(v.loc || v.behavior || v.mech || v.hematoma) return '中危 (风险约 0.9%)'; } else { if(v.loc || v.vomit || v.mech || v.headache) return '中危 (风险约 0.9%)'; } return '低危 (风险 < 0.02%)'; }",
    "计算公式": "PECARN 临床预测规则逻辑判定",
    "公式解读": "PECARN 是目前国际公认最权威的儿童头外伤决策规则。它根据年龄将患儿分为两组，通过评估 GCS 评分、骨折体征、意识状态、受伤机制及核心症状，将脑损伤风险分为高、中、低三档，从而指导 CT 检查的必要性。",
    "参考范围": "临床显著性创伤性脑损伤 (ciTBI) 风险评估",
    "健康建议": "function(res, v){ if(res.includes('高危')) return '建议立即行头颅 CT 扫描。患儿存在严重的脑损伤指征，如精神状态改变或可疑颅骨骨折，ciTBI 风险极高。'; if(res.includes('中危')) { var msg = '建议根据临床经验决定 CT 或留院观察 4-6 小时。'; if(v.age_group === '< 2 岁' && v.hematoma) msg += ' 尤其注意：<2 岁患儿非额头的血肿往往预示着更高的骨折风险。'; if(v.age_group === '≥ 2 岁' && v.vomit) msg += ' 提示：大龄儿若伴有频繁呕吐，需警惕颅压增高。'; return msg; } return '建议居家观察。患儿发生临床显著性脑损伤的概率极低（万分之二）。为避免不必要的放射线暴露，不推荐行常规 CT 扫描。若观察期间出现频繁呕吐或抽搐，请立即返院。'; }",
    "category": "儿科学",
    "适用人群": "GCS 14-15 分的轻微头部损伤患儿",
    "临床场景": "急诊外科/儿科抢救室"
  },
  {
    "id": "pram_tree",
    "title": "PRAM 儿童哮喘急性发作决策路径",
    "输出": "严重度分级及临床分流",
    "输入": [
      {
        "name": "spo2",
        "label": "血氧饱和度 (室温下 SpO2)",
        "type": "select",
        "options": [
          "> 94% (0分)",
          "92%-94% (1分)",
          "< 92% (2分)"
        ]
      },
      {
        "name": "retraction",
        "label": "三凹征 (吸气性胸廓凹陷)",
        "type": "select",
        "options": [
          "无 (0分)",
          "仅胸骨上或肋间隙 (1分)",
          "胸骨上及肋间隙均有 (2分)",
          "包含锁骨上/胸锁乳突肌 (3分)"
        ]
      },
      {
        "name": "air_entry",
        "label": "吸气入气量 (肺部听诊)",
        "type": "select",
        "options": [
          "正常 (0分)",
          "呼吸音对称性减弱 (1分)",
          "呼吸音显著减弱/单侧消失 (2分)",
          "听诊寂静胸/几乎无气流 (3分)"
        ]
      },
      {
        "name": "wheeze",
        "label": "哮鸣音 (听诊)",
        "type": "select",
        "options": [
          "无 (0分)",
          "仅呼气末哮鸣 (1分)",
          "全呼气相哮鸣 (2分)",
          "吸气及呼气相均有 (3分)"
        ]
      }
    ],
    "计算结果": "function(v){ var s = 0; s += parseInt(v.spo2.match(/\\d/)[0]); s += parseInt(v.retraction.match(/\\d/)[0]); s += parseInt(v.air_entry.match(/\\d/)[0]); s += parseInt(v.wheeze.match(/\\d/)[0]); if(s >= 8 || v.air_entry.includes('3分') || v.spo2.includes('2分')) return '重度 (红区)：濒危/需立即住院'; if(s >= 4) return '中度 (黄区)：需留观干预'; return '轻度 (绿区)：可居家或门诊治疗'; }",
    "计算公式": "基于 PRAM 核心指标的逻辑权重判定",
    "公式解读": "PRAM 决策树逻辑：只要血氧跌破 92% 或听诊出现“寂静胸”，无论其他分数多少，直接划为重度。其余情况按 0-12 分累加判定。",
    "参考范围": "0-3分轻度，4-7分中度，8-12分重度",
    "健康建议": "function(res, v){ if(res.includes('重度')) return '致命红色预警！患儿存在呼吸衰竭风险。立即给予连续雾化吸入 SABA + 异丙托溴铵，静脉推注糖皮质激素，并安排收治 PICU。'; if(res.includes('中度')) return '中度发作。建议给予 1-3 次间隔雾化治疗，口服泼尼松龙，并在急诊留观 2-4 小时。若 PRAM 评分不下降需住院。'; return '轻度发作。可按需吸入 SABA（万托林），给予口服激素 3-5 天，并嘱家长门诊规律随访，学习哮喘行动计划。'; }",
    "category": "儿科学",
    "适用人群": "2-17 岁哮喘急性发作儿童",
    "临床场景": "急诊分流与住院指征评估"
  },
  {
    "id": "ett_size",
    "title": "气管插管型号的选择(带囊)",
    "输出": "导管内径(ID) mm",
    "输入": [
      {
        "name": "age",
        "label": "年龄(岁)",
        "type": "number",
        "placeholder": "4"
      }
    ],
    "计算结果": "function(v){return (v.age/4 + 3.5).toFixed(1);}",
    "计算公式": "年龄/4 + 3.5",
    "公式解读": "计算带有充气套囊的气管导管内径。带囊导管相比无囊导管外径更粗，因此计算公式基数减小了0.5。",
    "参考范围": "根据年龄推算，新生儿禁用带囊导管",
    "健康建议": "function(res, v){ return '理论推算导管内径为 ' + res + ' mm。使用带囊导管可减少漏气和误吸风险，但气囊压力必须严格控制在20cmH2O以下。若充气过饱，极易导致儿童脆弱的气道黏膜发生缺血性坏死及远期声门下狭窄。'; }",
    "category": "儿科学",
    "适用人群": "需气管插管儿童",
    "临床场景": "急诊/麻醉科/PICU"
  },
  {
    "id": "hdn_differential_diagnosis",
    "title": "Rh 与 ABO 新生儿溶血病鉴别诊断",
    "version": "1.0",
    "输出": "溶血病类型判定及严重度预警",
    "输入": [
      {
        "name": "maternal_blood",
        "label": "1. 母亲血型",
        "type": "select",
        "options": [
          "O 型",
          "Rh 阴性 (D抗原阴性)",
          "其他"
        ]
      },
      {
        "name": "infant_blood",
        "label": "2. 患儿血型",
        "type": "select",
        "options": [
          "A 或 B 型",
          "Rh 阳性 (D抗原阳性)",
          "与母亲相同"
        ]
      },
      {
        "name": "birth_order",
        "label": "3. 胎次",
        "type": "select",
        "options": [
          "第一胎",
          "第二胎及以后",
          "既往有流产/输血史"
        ]
      },
      {
        "name": "jaundice_onset",
        "label": "4. 黄疸出现时间",
        "type": "select",
        "options": [
          "生后 24 小时内 (极快)",
          "生后 2-3 天 (较晚)",
          "无明显黄疸"
        ]
      }
    ],
    "计算结果": "function(v){ if(v.maternal_blood === 'Rh 阴性' && v.infant_blood === 'Rh 阳性') return '高度疑似：Rh 溶血病 (病情通常较重)'; if(v.maternal_blood === 'O 型' && (v.infant_blood === 'A 或 B 型')) return '疑似：ABO 溶血病 (多见，症状较轻)'; return '可能性低：需排查 G6PD、感染或生理性黄疸'; }",
    "比较维度": [
      {
        "项目": "血型组合",
        "ABO溶血": "母O，子A或B",
        "Rh溶血": "母Rh(-)，子Rh(+)"
      },
      {
        "项目": "第一胎发病",
        "ABO溶血": "可发病 (约50%)",
        "Rh溶血": "极罕见 (除非有输血史)"
      },
      {
        "项目": "黄疸程度",
        "ABO溶血": "较轻",
        "Rh溶血": "重，进展极快"
      },
      {
        "项目": "贫血/肝脾大",
        "ABO溶血": "不明显",
        "Rh溶血": "明显，可致胎儿水肿"
      },
      {
        "项目": "Coombs试验",
        "ABO溶血": "可为阴性/弱阳性",
        "Rh溶血": "强阳性 (具有诊断意义)"
      }
    ],
    "临床建议": "function(res, v){ if(res.includes('Rh')){ return '【高危决策】1. 立即监测胆红素上升速度；2. 准备光疗及换血疗法（Rh系统）；3. 完善改良抗体释放试验；4. 关注晚期贫血风险。'; } if(res.includes('ABO')){ return '【常规干预】1. 早期光疗；2. 监测胆红素趋势；3. 若胆红素达到换血指征，选择 O 型红细胞和 AB 型血浆。'; } return '密切观察，完善溶血三项筛查。'; }",
    "category": "儿科学",
    "适用人群": "生后早期出现黄疸的新生儿",
    "clinical_scenario": "新生儿病理性黄疸的病因鉴别及急诊干预"
  },
  {
    "id": "tanner_staging_male",
    "title": "男性 Tanner 性发育分期标准",
    "version": "1.0",
    "输出": "性发育分期判定及发育评估",
    "输入": [
      {
        "name": "genital_stage",
        "label": "1. 外生殖器发育 (G 分期)",
        "type": "select",
        "options": [
          "G1: 幼稚型 (睾丸容积 < 4ml)",
          "G2: 睾丸增大 (容积 ≥ 4ml), 阴囊皮肤变红变薄",
          "3: 阴茎增长/增粗, 睾丸进一步增大",
          "G4: 阴茎头发育, 阴囊颜色加深",
          "G5: 成人型外生殖器"
        ]
      },
      {
        "name": "pubic_hair_stage",
        "label": "2. 阴毛发育 (PH 分期)",
        "type": "select",
        "options": [
          "PH1: 无阴毛 (幼年型)",
          "PH2: 阴茎根部见长、细、色浅的稀疏毛发",
          "PH3: 颜色变深, 卷曲, 范围扩展至耻骨联合上方",
          "PH4: 毛发特征同成人, 但分布范围未达大腿内侧",
          "PH5: 成人型分布 (倒三角形并扩展至大腿内侧)"
        ]
      },
      {
        "name": "age",
        "label": "3. 患儿当前年龄 (岁)",
        "type": "number",
        "placeholder": "11"
      }
    ],
    "计算结果": "function(v){ var g = parseInt(v.genital_stage.substring(1,2)); var ph = parseInt(v.pubic_hair_stage.substring(2,3)); var age = v.age; if(age < 9 && g >= 2) return '分期：G' + g + ' PH' + ph + ' (警告：性早熟可能)'; if(age > 14 && g === 1) return '分期：G' + g + ' PH' + ph + ' (警告：青春期发育延迟可能)'; return '分期：G' + g + ' PH' + ph + ' (发育进程正常)'; }",
    "计算公式": "基于 Marshall & Tanner (1970) 发布的男性发育阶段分级",
    "公式解读": "决策逻辑：1. 睾丸容积 ≥ 4ml 是男性进入青春期的第一个确切征象；2. 正常发育顺序通常为：睾丸增大 -> 阴毛出现 -> 阴茎增长 -> 变声/遗精。",
    "参考范围": "男孩青春期发动平均年龄为 10.5 - 12 岁",
    "临床建议": "function(res, v){ if(res.includes('性早熟')){ return '【高危决策】9岁前出现 G2 或以上表现。1. 完善骨龄检查 (BA)；2. 行 GnRH 激发试验；3. 查头颅 MRI (排除中枢性占位)；4. 监测身高增长速率。'; } if(res.includes('延迟')){ return '【临床干预】14岁尚未开始发育。1. 排查性腺轴功能 (FSH/LH/T)；2. 完善染色体核型分析 (排除 Klinefelter 综合征)；3. 评估是否有全身性慢性病影响。'; } return '【健康评价】目前发育进度符合年龄特征。建议：关注变声及生长突增 (PHV) 期的身高管理。'; }",
    "category": "儿科学",
    "适用人群": "9 - 18 岁男性青少年",
    "clinical_scenario": "矮小症/性早熟门诊评估、青春期发育常规监测"
  },
  {
    "id": "zubrod",
    "title": "体力状况评分(Zubrod/ECOG)",
    "输出": "功能分级(0-5级)",
    "输入": [
      {
        "name": "s",
        "label": "评估级别(0正常-4卧床)",
        "type": "number",
        "placeholder": "1"
      }
    ],
    "计算结果": "function(v){return v.s===0?'0级(完全正常)':v.s===1?'1级(有症状可活动)':v.s===2?'2级(白天过半时间可起床)':v.s===3?'3级(白天过半时间卧床)':v.s===4?'4级(完全卧床)':'5级(死亡)';}",
    "计算公式": "日常活动能力量表定性",
    "公式解读": "肿瘤学中评估患儿基础体能、疾病消耗程度以及能否耐受高强度化学治疗的核心指标。",
    "参考范围": "0-2级具有化疗耐受性",
    "健康建议": "function(res, v){ if(v.s <= 2) return '评估为 ' + res + '。患儿基础体能尚可，通常能够耐受常规剂量强度的抗肿瘤化学治疗或放射治疗。'; return '评估为 ' + res + '。患儿体能极差，处于严重消耗状态。此时若强行实施足量化疗，极易引发致命性的骨髓抑制或感染休克。建议以最佳支持治疗(BSC)、营养干预和姑息减症为主，待体能恢复后再评估抗肿瘤治疗。'; }",
    "category": "儿科学",
    "适用人群": "恶性肿瘤及白血病患儿",
    "临床场景": "血液肿瘤科病房"
  },
  {
    "id": "surg_dehyd",
    "title": "外科病儿脱水补液量和补液张力",
    "输出": "首选液体张力方案",
    "输入": [
      {
        "name": "loss",
        "label": "失水物理性质",
        "type": "select",
        "options": [
          "等渗性脱水",
          "低渗性脱水",
          "高渗性脱水"
        ]
      }
    ],
    "计算结果": "function(v){return v.loss==='等渗性脱水'?'1/2张 至 2/3张液':v.loss==='低渗性脱水'?'等张液 (0.9%生理盐水或林格氏液)':'1/3张 至 1/5张偏低渗液';}",
    "计算公式": "张力对冲与渗透压匹配法则",
    "公式解读": "快速指导小儿外科急腹症（如肠梗阻、幽门狭窄）伴发不同性质脱水时的静脉复苏液体配方。",
    "参考范围": "重度休克扩容首剂均盲用等张液",
    "健康建议": "function(res, v){ if(v.loss === '高渗性脱水') return '由于水分丢失大于钠丢失，维持补液应选择 ' + res + '。但切记降钠速度不可过快，建议在48小时内缓慢匀速纠正，以防血浆渗透压骤降导致水分大量涌入脑细胞诱发急性脑水肿。'; if(v.loss === '低渗性脱水') return '由于钠丢失大于水丢失，极易发生休克。必须使用 ' + res + ' 进行强力扩容，以迅速恢复有效循环血量。'; return '推荐使用 ' + res + '。在尿量恢复（>1ml/kg/h）后，务必在液体中加入氯化钾以纠正外科疾病常见的低钾血症。'; }",
    "category": "儿科学",
    "适用人群": "外科急腹症伴脱水患儿",
    "临床场景": "小儿外科/急诊室"
  },
  {
    "id": "maint_fluid",
    "title": "维持液体计算 (4-2-1法则)",
    "输出": "静脉输液速度 (mL/h)",
    "输入": [
      {
        "name": "wt",
        "label": "患儿体重(kg)",
        "type": "number",
        "placeholder": "25"
      }
    ],
    "计算结果": "function(v){var w=v.wt; return w<=10?w*4:w<=20?40+(w-10)*2:60+(w-20)*1;}",
    "计算公式": "Holliday-Segar 法则转化为小时速率",
    "公式解读": "推算在完全禁食、无额外活动消耗状态下，维持机体基础新陈代谢每小时所需输入的水分。",
    "参考范围": "各年龄段及体重通用",
    "健康建议": "function(res, v){ return '患儿当前的基础生理液体维持速率为 ' + res + ' mL/h。临床应用时需根据实际情况进行加减：若伴有发热（体温每升高1℃增加10-12%）、多汗或胃肠减压，需额外叠加补偿；若患有急性脑损伤、肺炎、脑膜炎（警惕SIADH），则需将总液量限制在基础量的70%-80%。'; }",
    "category": "儿科学",
    "适用人群": "需静脉营养或禁食的儿童",
    "临床场景": "儿科病房/围手术期"
  },
  {
    "id": "westley_croup_score",
    "title": "Westley 儿童哮吼评分",
    "version": "1.0",
    "输出": "哮吼严重度分级及急诊干预决策",
    "输入": [
      {
        "name": "inspiratory_stridor",
        "label": "1. 吸气性喉鸣 (Stridor)",
        "type": "select",
        "options": [
          "0分: 无",
          "1分: 仅在躁动/哭闹时有",
          "2分: 安静时即有"
        ]
      },
      {
        "name": "retractions",
        "label": "2. 三凹征 (Retractions)",
        "type": "select",
        "options": [
          "0分: 无",
          "1分: 轻度",
          "2分: 中度",
          "3分: 重度"
        ]
      },
      {
        "name": "air_entry",
        "label": "3. 进气量 (Air Entry/呼吸音)",
        "type": "select",
        "options": [
          "0分: 正常",
          "1分: 轻度降低",
          "2分: 明显降低/几乎听不到"
        ]
      },
      {
        "name": "cyanosis",
        "label": "4. 发绀 (Cyanosis)",
        "type": "select",
        "options": [
          "0分: 无",
          "4分: 躁动/哭闹时有",
          "5分: 安静时即有"
        ]
      },
      {
        "name": "consciousness",
        "label": "5. 意识状态 (Level of Consciousness)",
        "type": "select",
        "options": [
          "0分: 正常 (含入睡)",
          "5分: 意识模糊/嗜睡/萎靡"
        ]
      }
    ],
    "计算结果": "function(v){ var s = 0; s += parseInt(v.inspiratory_stridor.match(/\\d/)[0]); s += parseInt(v.retractions.match(/\\d/)[0]); s += parseInt(v.air_entry.match(/\\d/)[0]); s += parseInt(v.cyanosis.match(/\\d/)[0]); s += parseInt(v.consciousness.match(/\\d/)[0]); if(s >= 12) return s + ' 分 (极重度：呼吸衰竭前期)'; if(s >= 6) return s + ' 分 (重度：需强制住院)'; if(s >= 3) return s + ' 分 (中度：需急诊留观)'; return s + ' 分 (轻度：通常可居家观察)'; }",
    "计算公式": "Westley Score = 喉鸣 + 三凹征 + 进气量 + 发绀 + 意识 (加权累加)",
    "公式解读": "决策逻辑：1. 核心分水岭在 3 分（中度）和 6 分（重度）；2. 只要出现安静时发绀或意识模糊，分值会直接跳升，预示气道随时关闭。",
    "参考范围": "得分越高，上呼吸道梗阻越严重",
    "健康建议": "function(res, v){ if(res.includes('重度')){ return '【紧急医疗决策】1. 立即吸入雾化肾上腺素 (0.5ml/kg)；2. 给予地塞米松 (静脉或肌注)；3. 准备气管插管用品及儿科高级生命支持；4. 绝对严禁按压舌根查咽。'; } if(res.includes('中度')){ return '【急诊干预】1. 雾化吸入肾上腺素观察；2. 口服或静脉给予地塞米松 (0.6mg/kg)；3. 观察 2-4 小时，若无改善转为住院。'; } return '【日常监测】1. 单剂口服地塞米松；2. 增加空气湿度（冷雾）；3. 告知家长：若安静时出现喉鸣或呼吸费力，立即返院。'; }",
    "category": "儿科学",
    "适用人群": "疑似哮吼（犬吠样咳嗽、声音嘶哑）的患儿",
    "clinical_scenario": "儿科急诊预检、上呼吸道梗阻程度动态评估"
  },
  {
    "id": "rdr_test",
    "title": "相对剂量反应试验 (RDR)",
    "输出": "维生素A缺乏状态",
    "输入": [
      {
        "name": "v1",
        "label": "口服VitA前基础血清浓度",
        "type": "number",
        "placeholder": "1.0"
      },
      {
        "name": "v2",
        "label": "口服后5小时血清浓度",
        "type": "number",
        "placeholder": "1.5"
      }
    ],
    "计算结果": "function(v){return (v.v2-v.v1)/v.v2>0.2?'阳性 (证实存在VitA缺乏)':'阴性 (肝脏储备充足)';}",
    "计算公式": "(服药后浓度 - 服药前浓度) ÷ 服药后浓度 × 100%",
    "公式解读": "由于维生素A主要储存在肝脏，外周血浓度往往难以反映真实的缺乏状态。此激发试验是确诊亚临床期维生素A缺乏的金标准。",
    "参考范围": ">20% 即为阳性",
    "健康建议": "function(res, v){ if(res.includes('阳性')) return '试验结果阳性，证实肝脏内维生素A储备已严重枯竭。VitA缺乏极易导致暗适应能力下降（夜盲症）、角膜软化及呼吸道、消化道黏膜免疫力崩溃。建议立即启动大剂量维生素A突击补充治疗。'; return '试验阴性，提示机体维生素A储备充盈，暂无需干预。'; }",
    "category": "儿科学",
    "适用人群": "营养不良及反复感染儿童",
    "临床场景": "儿保科/临床营养科"
  },
  {
    "id": "ch_lt4_titration_2026",
    "title": "先天性甲低 (CH) L-T4 替代治疗剂量表",
    "version": "1.0",
    "输出": "各年龄段起始剂量及目标监测值",
    "输入": [
      {
        "name": "age_group",
        "label": "1. 患儿当前年龄段",
        "type": "select",
        "options": [
          "新生儿 (0 - 6个月)",
          "婴儿 (6 - 12个月)",
          "幼儿 (1 - 5岁)",
          "儿童 (6 - 12岁)",
          "青少年 (> 12岁)"
        ]
      },
      {
        "name": "weight",
        "label": "2. 当前体重 (kg)",
        "type": "number",
        "placeholder": "3.5"
      },
      {
        "name": "cardiac_risk",
        "label": "3. 合并先天性心脏病",
        "type": "checkbox"
      }
    ],
    "计算结果": "function(v){ var w = v.weight; var d_min, d_max; if(v.age_group.includes('新生儿')){ d_min = 10; d_max = 15; } else if(v.age_group.includes('6 - 12个月')){ d_min = 6; d_max = 8; } else if(v.age_group.includes('1 - 5岁')){ d_min = 5; d_max = 6; } else if(v.age_group.includes('6 - 12岁')){ d_min = 4; d_max = 5; } else { d_min = 2; d_max = 3; } var base = d_min * w; if(v.cardiac_risk) return '起始剂量 (低限开始)：' + Math.round(base / 2) + ' μg/d (注：心脏病需缓慢加量)'; return '起始剂量范围：' + Math.round(d_min * w) + ' - ' + Math.round(d_max * w) + ' μg/d'; }",
    "计算公式": "L-T4 剂量 = 年龄段系数 (μg/kg/d) × 体重 (kg)",
    "公式解读": "决策逻辑：1. 早期（0-6月）剂量最高，以确保血清 FT4 在 2 周内达标；2. 随年龄增长，基础代谢率下降，单位体重剂量逐渐减少。",
    "参考范围": "治疗目标：FT4/T4 维持在正常范围的上 1/3；TSH 维持在 0.5 - 2.0 mIU/L",
    "健康建议": "function(res, v){ var plan = ''; if(v.age_group.includes('新生儿')) plan = '每 2 周复查一次甲功'; else if(v.age_group.includes('1 - 5岁')) plan = '每 2-3 个月复查一次'; else plan = '每 3-6 个月复查一次'; return '【临床路径】1. 服药方法：每日晨起空腹服用，30-60 分钟后再进食；2. 严禁与豆奶、钙片、铁剂、纤维素同服（需间隔4小时）；3. 复查计划：' + plan + '。'; }",
    "category": "儿科学",
    "适用人群": "确诊 CH 的患儿及家长",
    "clinical_scenario": "新生儿筛查阳性后的首次用药指导、长期替代治疗剂量调整"
  },
  {
    "id": "ped_tpn_dosing_2026",
    "title": "小儿全肠外营养 (TPN) 每日推荐用量",
    "version": "1.0",
    "输出": "各类营养素每日目标用量及热卡计算",
    "输入": [
      {
        "name": "weight",
        "label": "1. 患儿当前体重 (kg)",
        "type": "number",
        "placeholder": "3.5"
      },
      {
        "name": "age_group",
        "label": "2. 年龄/发育阶段",
        "type": "select",
        "options": [
          "早产儿 (VLBW/ELBW)",
          "足月新生儿 (0-28天)",
          "婴儿 (1-12个月)",
          "幼儿/儿童 (1-10岁)"
        ]
      },
      {
        "name": "is_initial",
        "label": "3. 是否为起始第一天 (渐进式加量)",
        "type": "checkbox"
      }
    ],
    "计算结果": "function(v){ var w = v.weight; var aa_min, aa_max, fat_min, fat_max, cho_min, cho_max, kcal_goal; if(v.age_group.includes('早产儿')){ aa_min = 1.5; aa_max = 4.0; fat_min = 1.0; fat_max = 3.5; cho_min = 6; cho_max = 12; kcal_goal = 110; } else if(v.age_group.includes('新生儿')){ aa_min = 1.5; aa_max = 3.0; fat_min = 1.0; fat_max = 3.0; cho_min = 8; cho_max = 14; kcal_goal = 100; } else if(v.age_group.includes('婴儿')){ aa_min = 1.5; aa_max = 2.5; fat_min = 1.0; fat_max = 3.0; cho_min = 10; cho_max = 14; kcal_goal = 90; } else { aa_min = 1.0; aa_max = 2.0; fat_min = 1.0; fat_max = 2.0; cho_min = 12; cho_max = 16; kcal_goal = 75; } var aa_res = v.is_initial ? aa_min : aa_max; var fat_res = v.is_initial ? fat_min : fat_max; return { '氨基酸 (AA)': (aa_res * w).toFixed(1) + ' g/d', '脂肪乳 (Fat)': (fat_res * w).toFixed(1) + ' g/d', '葡萄糖 (CHO)': '速度 4-8 mg/(kg·min)', '目标热卡': (kcal_goal * w).toFixed(0) + ' kcal/d' }; }",
    "计算公式": "基于体重及代谢水平的阶梯补给法",
    "公式解读": "决策逻辑：1. 氨基酸：早产儿需早期足量以防止蛋白分解；2. 脂肪乳：需监测甘油三酯；3. 热氮比：维持在 150-200:1 以确保蛋白合成。",
    "参考范围": "液体总量需根据心肾功能及不显性失水调整",
    "临床建议": "function(res, v){ return '【TPN 配置核心】1. 能量分配：碳水(50%)、脂肪(35%-40%)、蛋白(10%-15%)；2. 监测项：每日称重，每周 2 次监测肝功、电解质、血糖、血脂；3. 渗透压：外周静脉不宜超过 900 mOsm/L，高浓度必须经中心静脉 (PICC)。'; }",
    "category": "儿科学",
    "适用人群": "不能经口进食、胃肠道功能衰竭或手术后患儿",
    "clinical_scenario": "PICU/NICU 长期住院患儿营养支持方案制定"
  },
  {
    "id": "teething",
    "title": "小儿出牙顺序与数量估算",
    "输出": "理论出牙情况",
    "输入": [
      {
        "name": "mo",
        "label": "实际月龄",
        "type": "number",
        "placeholder": "8"
      }
    ],
    "计算结果": "function(v){return v.mo<6?'尚未到生理萌出期':v.mo<=10?'下/上中切牙(门牙)萌出, 约 '+(Math.max(v.mo-6,1))+' 颗':'侧切牙及乳磨牙陆续萌出, 约 '+(v.mo-4)+' 颗';}",
    "计算公式": "2岁前牙齿数 ≈ 月龄 - 4(或6)",
    "公式解读": "评估婴幼儿骨骼系统及钙磷代谢发育的直观体征。个体差异较大，公式仅供粗略参考。",
    "参考范围": "通常6个月萌出第一颗，2.5岁前出齐20颗乳牙",
    "健康建议": "function(res, v){ if(v.mo >= 13 && v.mo - 6 <= 0) return '患儿已满13个月仍未萌出第一颗乳牙，临床上定义为【出牙延迟】。建议排查是否存在严重的维生素D缺乏性佝偻病、甲状腺功能低下或极其罕见的无牙畸形。'; return '理论评估状态：' + res + '。婴幼儿出牙期间可能伴随轻微烦躁、流涎及低热，建议给予安全的咬胶玩具缓解牙龈不适，并在第一颗牙萌出后即开始口腔清洁。'; }",
    "category": "儿科学",
    "适用人群": "0-3岁婴幼儿",
    "临床场景": "儿保科常规体检"
  },
  {
    "id": "ped_developmental_milestones",
    "title": "儿童动作及行为发育里程碑 (0-3岁)",
    "version": "1.0",
    "输出": "发育月龄匹配度及预警指征",
    "输入": [
      {
        "name": "actual_age",
        "label": "1. 患儿实际月龄 (月)",
        "type": "number",
        "placeholder": "12"
      },
      {
        "name": "gross_motor",
        "label": "2. 大运动表现",
        "type": "select",
        "options": [
          "抬起头 (2-3月)",
          "会翻身 (4-5月)",
          "能独坐 (6-7月)",
          "会爬行 (8-9月)",
          "独站/走 (12-15月)",
          "跑/踢球 (2岁)"
        ]
      },
      {
        "name": "fine_motor",
        "label": "3. 精细运动表现",
        "type": "select",
        "options": [
          "握持反射 (1月)",
          "伸手抓物 (4-5月)",
          "换手/倒手 (6-7月)",
          "拇食指捏取 (9-10月)",
          "叠方块/乱画 (1-2岁)"
        ]
      },
      {
        "name": "social_lang",
        "label": "4. 语言与社会行为",
        "type": "select",
        "options": [
          "逗引会笑 (2月)",
          "认亲人 (5-6月)",
          "叫爸妈 (9-12月)",
          "说短句 (2岁)"
        ]
      }
    ],
    "计算结果": "function(v){ var age = v.actual_age; var milestone_map = {'抬起头':3, '会翻身':5, '能独坐':7, '会爬行':9, '独站/走':12, '跑/踢球':24}; var motor_age = milestone_map[v.gross_motor.split(' (')[0]]; if(age - motor_age > 3) return '发育警示：大运动发育显著滞后 (落后 > 3个月)'; if(age - motor_age >= 0) return '发育评定：与月龄基本相符'; return '发育评定：发育领先于同龄儿'; }",
    "计算公式": "基于 Denver 发育筛查测验 (DDST) 及中国儿童发育量表标准",
    "公式解读": "决策逻辑：1. 遵循“从上到下、从近到远、从粗到细”的规律；2. 关键红线：4个月不抬头、9个月不独坐、18个月不会走。",
    "参考范围": "口诀：一听二看三抬头，四撑五抓六翻身，七坐八爬九扶立，一岁娃娃会走路。",
    "临床建议": "function(res, v){ if(res.includes('滞后')){ return '【决策：深度评估】1. 完善 ASQ (年龄与发育进程问卷) 测评；2. 检查肌张力及原始反射；3. 排查是否存在脑瘫、智力障碍或孤独症倾向；4. 建议康复科门诊。'; } return '【日常指导】1. 强化 Tummy Time (俯卧时间)；2. 多与患儿语言交流；3. 提供适合月龄的玩具（如抓握球、绘本）。'; }",
    "category": "儿科学",
    "适用人群": "0 - 6 岁儿童及家长",
    "clinical_scenario": "儿科定期体检、发育迟缓早期筛查"
  },
  {
    "id": "rr_norm",
    "title": "小儿各年龄呼吸频率生理均值",
    "输出": "正常平静呼吸率 (次/分)",
    "输入": [
      {
        "name": "age",
        "label": "年龄(岁，<1岁按0填)",
        "type": "number",
        "placeholder": "2"
      }
    ],
    "计算结果": "function(v){return v.age<1?'30-40 次/分':v.age<=3?'25-30 次/分':v.age<=7?'20-25 次/分':'接近成人 (16-20 次/分)';}",
    "计算公式": "依据年龄段的基础代谢率查表",
    "公式解读": "儿童基础代谢率高，代偿空间小，呼吸频率远快于成人。该指标是评估小儿呼吸系统疾病最基础、最敏感的体征。",
    "参考范围": "发热时体温每升高1℃，呼吸增快约4次/分",
    "健康建议": "function(res, v){ return '该年龄段的健康平静呼吸率应在 ' + res + ' 之间。请注意：在排除了发热和哭闹的干扰后，若安静状态下的呼吸频率超过同年龄段上限，是世界卫生组织(WHO)推荐的在资源匮乏地区临床初步诊断【儿童肺炎】的最核心依据。'; }",
    "category": "儿科学",
    "适用人群": "儿童",
    "临床场景": "儿科门急诊预检分诊"
  },
  {
    "id": "bp_norm",
    "title": "小儿各年龄平均收缩压",
    "输出": "收缩压估算值 (mmHg)",
    "输入": [
      {
        "name": "age",
        "label": "年龄(岁, 须>1岁)",
        "type": "number",
        "placeholder": "5"
      }
    ],
    "计算结果": "function(v){return Math.round(80 + 2 * v.age);}",
    "计算公式": "收缩压 = 80 + 年龄 × 2",
    "公式解读": "快速判定急诊抢救现场儿童是否存在低血压休克或高血压危象的速算口诀。",
    "参考范围": "舒张压约为收缩压的 2/3",
    "健康建议": "function(res, v){ var low_limit = 70 + 2 * v.age; return '该年龄的理论标准收缩压约为 ' + res + ' mmHg。在创伤或重症感染时，若实测收缩压跌破低压警戒线（' + low_limit + ' mmHg），标志着患儿已进入失代偿期休克状态，随时面临心跳骤停，必须立即静脉推注生理盐水扩容并准备血管活性药物！'; }",
    "category": "儿科学",
    "适用人群": "1岁以上儿童",
    "临床场景": "急诊复苏/PICU生命体征监测"
  },
  {
    "id": "hr_norm",
    "title": "小儿各年龄心率均值及范围",
    "输出": "正常安静心率 (次/分)",
    "输入": [
      {
        "name": "age",
        "label": "年龄(岁，<1岁按0填)",
        "type": "number",
        "placeholder": "1"
      }
    ],
    "计算结果": "function(v){return v.age<1?'110-150 次/分':v.age<=3?'100-130 次/分':v.age<=7?'80-100 次/分':'接近成人标准';}",
    "计算公式": "依据年龄段查表分布",
    "公式解读": "判断儿科患者是否存在心律失常、心力衰竭或休克代偿的基准尺。",
    "参考范围": "体温每升高1℃，心率通常增加10-15次/分",
    "健康建议": "function(res, v){ return '此年龄段的生理心率区间为 ' + res + '。儿童的心率受情绪(哭闹)和体温影响极大，评估心率是否真正存在阵发性室上速或异常心动过缓时，必须在患儿深度睡眠或彻底安静后进行听诊或心电图采集。'; }",
    "category": "儿科学",
    "适用人群": "儿童",
    "临床场景": "体检筛查/急诊体征评估"
  },
  {
    "id": "salter_harris",
    "title": "小儿骨骺损伤 Salter-Harris 分类",
    "输出": "骨折类型及临床预后",
    "输入": [
      {
        "name": "type",
        "label": "X线分型 (I-V型)",
        "type": "select",
        "options": [
          "I型 (骨骺分离)",
          "II型 (骺分离伴干骺端骨折)",
          "III型 (骺分离伴骨骺骨折)",
          "IV型 (跨越骺板的垂直骨折)",
          "V型 (骺板挤压损伤)"
        ]
      }
    ],
    "计算结果": "function(v){return v.type.includes('II')?'最常见类型，骨折线穿过骺板并带下一块干骺端，复位容易，预后良好':v.type.includes('V')?'隐匿性挤压伤，极易导致骺板早期闭合，预后最差':v.type.includes('I')?'单纯骺板分离，不累及骨组织，保守固定即可':'骨折线波及关节面，必须强求解剖复位';}",
    "计算公式": "基于X线下骨折线走行的形态学分类",
    "公式解读": "儿童骨骼两端存在负责长高的生长板（骨骺）。该量表用于评估外伤是否破坏了这层关键组织，直接关系到未来肢体是否会停止生长。",
    "参考范围": "I、II型多可保守，III、IV型常需手术",
    "健康建议": "function(res, v){ if(v.type.includes('V')) return 'V型损伤极其凶险且早期X线常无明显异常。由于生长板被强力压缩破坏，日后几乎不可避免地发生肢体短缩或严重成角畸形。建议密切随访并向家长充分告知远期致残风险。'; if(v.type.includes('III') || v.type.includes('IV')) return '此类骨折破坏了平滑的关节面。为防止远期创伤性关节炎及生长畸形，必须通过切开复位内固定(ORIF)实现绝对的解剖学平整。'; return res + '。早期石膏或高分子夹板妥善固定即可，一般不会影响终身高。'; }",
    "category": "儿科学",
    "适用人群": "四肢骨折创伤儿童",
    "临床场景": "急诊骨科/创伤外科"
  },
  {
    "id": "ett_rules",
    "title": "小儿气管插管深度经验法则",
    "输出": "预计导管插入深度",
    "输入": [
      {
        "name": "age",
        "label": "患儿年龄(岁)",
        "type": "number",
        "placeholder": "4"
      }
    ],
    "计算结果": "function(v){return '门齿刻度定位: ' + (v.age/2+12).toFixed(1) + ' cm';}",
    "计算公式": "年龄/2 + 12 (或 内径ID × 3)",
    "公式解读": "在紧急抢救心搏骤停或全麻诱导时，指导医师将气管导管送入至气管中段的最安全深度，避免单侧支气管插管。",
    "参考范围": "新生儿通常为 体重(kg)+6 cm",
    "健康建议": "function(res, v){ return '预估门齿固定深度为 ' + res + '。深度不足极易脱管，深度过大常误入右主支气管导致左肺不张及缺氧。插管后必须立即听诊双侧腋下呼吸音是否对称，并尽可能通过床旁X线胸片确认管尖位于气管隆突上方1-2cm处。'; }",
    "category": "儿科学",
    "适用人群": "需实施高级气道管理的儿童",
    "临床场景": "急诊抢救室/手术麻醉"
  },
  {
    "id": "body_props",
    "title": "小儿身体各部位比例变化",
    "输出": "躯体中心点位置",
    "输入": [
      {
        "name": "age",
        "label": "评估年龄(岁)",
        "type": "number",
        "placeholder": "1"
      }
    ],
    "计算结果": "function(v){return v.age<1?'头大躯干长，中点位于脐部以上':v.age<=6?'下肢加速生长，中点下移至脐与耻骨联合之间':'中点基本降至耻骨联合处，接近成人比例';}",
    "计算公式": "人体中点生理性下移规律",
    "公式解读": "反映了儿童从婴儿期“头重脚轻”向成人体态发育的生理骨骼生长轨迹。",
    "参考范围": "12岁以后上下部量基本等长",
    "健康建议": "function(res, v){ return '当前年龄段的正常发育体态为：' + res + '。若发现大龄儿童身体中点依然显著偏上（上部量异常大于下部量，表现为四肢极短），需高度怀疑软骨发育不全或甲状腺功能极度低下（克汀病），建议查验染色体及内分泌轴。'; }",
    "category": "儿科学",
    "适用人群": "处于体格发育期的儿童",
    "临床场景": "儿保科体型评估"
  },
  {
    "id": "bsa_ped",
    "title": "小儿体表面积 (BSA) 速算法",
    "输出": "体表面积估算 (m²)",
    "输入": [
      {
        "name": "wt",
        "label": "实测体重(kg, 限<30kg使用)",
        "type": "number",
        "placeholder": "15"
      }
    ],
    "计算结果": "function(v){return Math.round((v.wt*0.035+0.1)*100)/100;}",
    "计算公式": "体重(kg) × 0.035 + 0.1",
    "公式解读": "专门为30kg以下儿童设计的极简体表面积推算公式，省去了测量身高及开平方的复杂操作。",
    "参考范围": "新生儿约0.2m²；>30kg儿童则每增重5kg面积增加0.1m²",
    "健康建议": "function(res, v){ if(v.wt > 30) return '警告：患儿体重已超过30kg，继续使用此极简公式将产生较大误差。建议改用标准的 Mosteller 公式（平方根法）进行精确计算。'; return '计算得出体表面积为 ' + res + ' m²。在儿科学中，基础代谢率、不显性失水以及许多剧毒药物（如抗白血病化疗药、免疫抑制剂）的代谢均与体表面积呈高度正相关，按此数值给药比按体重给药更为精准安全。'; }",
    "category": "儿科学",
    "适用人群": "30kg以下的婴儿及学龄前儿童",
    "临床场景": "血液肿瘤科/风湿免疫科精准给药"
  },
  {
    "id": "fontanelle",
    "title": "小儿囟门与颅缝闭合时间",
    "输出": "生理性闭合预估时间",
    "输入": [
      {
        "name": "type",
        "label": "评估部位",
        "type": "select",
        "options": [
          "前囟门",
          "后囟门",
          "骨缝"
        ]
      }
    ],
    "计算结果": "function(v){return v.type==='前囟门'?'出生时1.5-2.0cm，1-1.5岁完全闭合':v.type==='后囟门'?'出生后6-8周完全闭合':'出生后3-4个月完全闭合';}",
    "计算公式": "颅骨骨化发育生理时间节点",
    "公式解读": "颅骨间的缝隙为大脑的快速膨胀生长提供了充足的物理空间，其大小及张力是观察婴儿颅内疾病的“天窗”。",
    "参考范围": "前囟最迟不应超过2岁闭合",
    "健康建议": "function(res, v){ if(v.type === '前囟门') return '前囟的正常闭合时间为 ' + res + '。如果前囟异常早闭（多伴随头围极小），需警惕小头畸形及脑发育不良；如果前囟延迟不闭（>2岁），最常见于严重的维生素D缺乏性佝偻病或先天性甲状腺功能低下。此外，若前囟饱满隆起，提示颅内高压（如脑膜炎、脑积水）；若明显凹陷，则是重度脱水的确凿体征。'; return '该部位的正常生理闭合时间为 ' + res + '。'; }",
    "category": "儿科学",
    "适用人群": "0-2岁婴幼儿",
    "临床场景": "儿保科查体/急诊脱水评估"
  },
  {
    "id": "dose_age",
    "title": "小儿药物计算法则 - 按年龄粗算法 (Young's Rule)",
    "输出": "预期小儿用药剂量",
    "输入": [
      {
        "name": "age",
        "label": "患儿年龄(岁)",
        "type": "number",
        "placeholder": "4"
      },
      {
        "name": "adult",
        "label": "说明书规定成人单次剂量",
        "type": "number",
        "placeholder": "500"
      }
    ],
    "计算结果": "function(v){return Math.round(v.age/(v.age+12) * v.adult);}",
    "计算公式": "年龄 / (年龄 + 12) × 成人剂量",
    "公式解读": "医学史上最古老的小儿药物折算法则。基于年龄比例强行缩减成人剂量。",
    "参考范围": "结果极其粗略，偏差大",
    "健康建议": "function(res, v){ return '粗略推算该儿童剂量为 ' + res + '。强烈警告：现代儿科学已极少使用按年龄折算的法则！因为同年龄儿童的体重差异巨大。此方法仅推荐在极端缺乏称重设备，或药品说明书仅提供成人剂量且无其它参考资料的急救现场，作为临时兜底测算。'; }",
    "category": "儿科学",
    "适用人群": "1-12岁儿童",
    "临床场景": "极端环境下的药剂估算"
  },
  {
    "id": "dose_bsa",
    "title": "小儿药物计算法则 - 按体表面积法",
    "输出": "精准小儿给药剂量",
    "输入": [
      {
        "name": "bsa",
        "label": "已测算出的患儿BSA(m²)",
        "type": "number",
        "placeholder": "0.6"
      },
      {
        "name": "adult",
        "label": "说明书规定成人单次剂量",
        "type": "number",
        "placeholder": "500"
      }
    ],
    "计算结果": "function(v){return Math.round(v.bsa/1.73 * v.adult);}",
    "计算公式": "(患儿BSA / 1.73) × 成人绝对剂量",
    "公式解读": "以标准成年人体表面积(1.73m²)为基准进行的面积比例折算。这是所有折算法中最科学、最契合机体药物代谢清除率(清除半衰期)的方案。",
    "参考范围": "抗肿瘤及靶向免疫药物唯一核准法则",
    "健康建议": "function(res, v){ return '精确推算用药剂量为 ' + res + '。该计算方法有效避免了直接按体重计算时，对过度肥胖或极度消瘦患儿造成的药物毒性蓄积或剂量不足。在开具高毒性化疗药物处方时，必须以此数据为准绳。'; }",
    "category": "儿科学",
    "适用人群": "各年龄段儿童",
    "临床场景": "儿科药房/血液肿瘤科处方核对"
  },
  {
    "id": "dose_wt",
    "title": "小儿药物计算法则 - 按体重法 (Clark's Rule)",
    "输出": "常规小儿用药剂量",
    "输入": [
      {
        "name": "wt",
        "label": "患儿实际体重(kg)",
        "type": "number",
        "placeholder": "15"
      },
      {
        "name": "adult",
        "label": "说明书规定成人单次剂量",
        "type": "number",
        "placeholder": "500"
      }
    ],
    "计算结果": "function(v){return Math.round(v.wt/70 * v.adult);}",
    "计算公式": "体重(kg) / 70 × 成人剂量",
    "公式解读": "以标准成年人体重(70kg)为基准进行的体重比例折算。这是日常儿科门诊应用最为广泛、最便捷的给药公式。",
    "参考范围": "常规抗生素及解热镇痛药的计算主流",
    "健康建议": "function(res, v){ return '按体重折算推算剂量为 ' + res + '。此方法适用于绝大多数门诊常规药物（如头孢类抗生素、布洛芬等）。但需要注意，对于极度肥胖的患儿，某些高度脂溶性的药物若完全按实际体重给药，可能会导致脂肪内蓄积中毒，此时应酌情参考理想体重进行调整。'; }",
    "category": "儿科学",
    "适用人群": "体型匀称的患病儿童",
    "临床场景": "儿科门急诊日常开药"
  },
  {
    "id": "tanner_f",
    "title": "Tanner分期 (女性性发育)",
    "输出": "发育阶段 (I-V期)",
    "输入": [
      {
        "name": "breast",
        "label": "乳房发育评估",
        "type": "select",
        "options": [
          "仅乳头轻微突起 (I期)",
          "乳芽形成,乳晕开始扩大 (II期)",
          "乳房与乳晕进一步扩大但无双重轮廓 (III期)",
          "乳晕及乳头突起形成明显的第二隆起 (IV期)",
          "成熟轮廓,仅乳头突起 (V期)"
        ]
      }
    ],
    "计算结果": "function(v){return v.breast.includes('I期')?'I期 (青春期前)':v.breast.includes('II期')?'II期 (青春期正式启动)':v.breast.includes('III期')?'III期':v.breast.includes('IV期')?'IV期':'V期 (发育成熟)';}",
    "计算公式": "基于乳房及乳晕隆起形态的5级视觉图谱判定",
    "公式解读": "乳房发育（Breast budding）是女童青春期启动的第一物理体征。Tanner图谱是国际公认的评判女性第二性征发育进程及激素水平的金标准。",
    "参考范围": "正常女童青春期启动年龄约为 9-10 岁",
    "健康建议": "function(res, v){ if(res.includes('II期')) return '乳房已达II期发育，标志着女孩青春期已正式启动。若此现象发生在8岁之前，医学上即定义为【性早熟】，必须尽快查验性激素激发试验及骨龄，防止骨骺过早闭合；若发生在正常年龄，请注意营养补充并做好心理引导。'; if(res.includes('III期') || res.includes('IV期')) return '处于 ' + res + ' 发育阶段。临床统计表明，女孩的初潮（第一次月经）绝大多数发生在乳房发育至 III 期和 IV 期之间。此时身高将迎来最后的加速生长高峰，需保障充足的钙质与睡眠。'; return '评估为 ' + res + '，发育阶段符合正常的生理演变轨迹。'; }",
    "category": "儿科学",
    "适用人群": "青春期发育阶段的女童",
    "临床场景": "内分泌门诊/儿童保健科发育筛查"
  },
  {
    "id": "bps_pain",
    "title": "行为疼痛量表 (BPS)",
    "输出": "客观疼痛严重度",
    "输入": [
      {
        "name": "s",
        "label": "面部表情/上肢运动/人机同步性 总分",
        "type": "number",
        "placeholder": "5"
      }
    ],
    "计算结果": "function(v){return v.s<=3?'无痛 (镇痛满意)':v.s<=5?'轻中度疼痛 (需密切观察)':v.s<=12?'重度甚至极度疼痛 (必须医疗干预)':'评分输入错误';}",
    "计算公式": "3项生理动作反应指标每项赋分1-4分",
    "公式解读": "专为在重症监护室中因气管插管、镇静或意识不清而无法自主用语言表达疼痛程度的患者设计的客观评估工具。",
    "参考范围": "总分3-12分，>5分视为显著疼痛",
    "健康建议": "function(res, v){ if(v.s > 5) return 'BPS评分提示患者正遭受 ' + res + '。剧烈的疼痛会引起交感神经强烈兴奋，极大增加心脏氧耗及代谢率，甚至诱发血流动力学崩盘。必须立即静脉追加强效阿片类镇痛药物（如芬太尼、瑞芬太尼），并在操作（如吸痰、翻身）前提前予以镇痛保护。'; return '评分为 ' + res + '。提示目前的镇静镇痛方案较为满意，患者处于相对舒适、无应激的休养状态，利于重症康复。'; }",
    "category": "儿科学",
    "适用人群": "PICU机械通气或深度镇静的儿童",
    "临床场景": "重症监护室床旁护理质控"
  },
  {
    "id": "precocious_pub",
    "title": "性早熟疾病的辅助检查",
    "输出": "必查项目建议",
    "输入": [
      {
        "name": "age",
        "label": "发病年龄(女孩<8,男孩<9)",
        "type": "number",
        "placeholder": "6"
      }
    ],
    "计算结果": "function(v){return '1.骨龄(X线); 2.盆腔/睾丸B超; 3.性激素激发试验(GnRH); 4.垂体MRI';}",
    "计算公式": "四大核心检查",
    "公式解读": "鉴别中枢性(真性)与外周性(假性)性早熟的必经之路。",
    "参考范围": "骨龄超前>1岁高度疑似",
    "健康建议": "function(res, v){ return '疑似性早熟患儿必须完善上述检查。真性性早熟会极大损耗骨骼生长潜力，导致成年终身高显著矮小，必要时需使用促性腺激素释放激素类似物(GnRHa)进行抑制治疗。'; }",
    "category": "儿科学",
    "适用人群": "性早熟疑诊患儿",
    "临床场景": "内分泌科"
  },
  {
    "id": "neo_vent",
    "title": "新生儿常见疾病机械通气初调参数",
    "输出": "初始设置建议",
    "输入": [
      {
        "name": "disease",
        "label": "疾病类型",
        "type": "select",
        "options": [
          "RDS(新生儿呼吸窘迫)",
          "MAS(胎粪吸入)"
        ]
      }
    ],
    "计算结果": "function(v){return v.disease.includes('RDS')?'高PEEP(5-6), 较短Ti, Pmax 15-20':'高气道阻力，需较长Te防止气道陷闭, PEEP 4-5';}",
    "计算公式": "病理生理导向设机",
    "公式解读": "RDS的本质是肺泡表面活性物质缺乏导致的肺顺应性差；而MAS的本质是胎粪阻塞导致的气道阻力极大。两者通气策略完全相反。",
    "参考范围": "需根据血气分析动态调节防气压伤",
    "健康建议": "function(res, v){ if(v.disease.includes('RDS')) return 'RDS患儿气管内打入肺表面活性物质(PS)后，肺顺应性常在数十分钟内骤然改善，此时必须迅速下调吸气峰压(PIP)以防发生致命性气胸。'; return 'MAS患儿极易发生气体陷闭和肺动脉高压，呼气时间(Te)必须足够长，必要时需联合一氧化氮(iNO)吸入治疗。'; }",
    "category": "儿科学",
    "适用人群": "需机械通气新生儿",
    "临床场景": "NICU"
  },
  {
    "id": "neo_tpn",
    "title": "新生儿肠外营养(TPN)推荐用量表",
    "输出": "宏量配比",
    "输入": [
      {
        "name": "d",
        "label": "日龄",
        "type": "number",
        "placeholder": "1"
      }
    ],
    "计算结果": "function(v){return v.d<=2?'氨基酸1.5g/kg, 糖6-8mg/kg/min, 脂1g/kg':'逐步加量至 氨基酸3.5g, 脂3g, 满足追赶生长';}",
    "计算公式": "早产儿积极营养策略",
    "公式解读": "打破传统的“饥饿疗法”，主张出生首日即给予蛋白质(氨基酸)以防止重度分解代谢。",
    "参考范围": "需密切监测血糖及血脂廓清情况",
    "健康建议": "function(res, v){ if(v.d <= 2) return '生后早期配方：' + res + '。此时外周静脉尚可耐受，但需严格控制葡萄糖输注速率(GIR)以防高血糖引发渗透性利尿及颅内出血。'; return '加量期配方：' + res + '。高浓度营养液必须通过PICC或脐静脉等中心静脉途径泵入，防范严重的静脉炎及组织坏死。'; }",
    "category": "儿科学",
    "适用人群": "早产及禁食新生儿",
    "临床场景": "NICU"
  },
  {
    "id": "neo_matur",
    "title": "新生儿成熟度评估表",
    "输出": "评分与胎龄",
    "输入": [
      {
        "name": "s",
        "label": "Ballard总分",
        "type": "number",
        "placeholder": "25"
      }
    ],
    "计算结果": "function(v){return Math.round((v.s+120)/5) + '周';}",
    "计算公式": "形态+神经成熟总分",
    "公式解读": "利用出生后最初几天的物理神经学特征，修正产妇末次月经记忆不清或早期超声缺失带来的胎龄误差。",
    "参考范围": "指导早产儿的精细护理与用药界限",
    "健康建议": "function(res, v){ return '查体推算真实胎龄为 ' + res + '。对于极早产儿，其神经肌张力通常极度低下（如足跟可轻易触及耳部），各项生理反射均未建立，需按极高危级别进行体温及呼吸管理。'; }",
    "category": "儿科学",
    "适用人群": "新生儿",
    "临床场景": "产房/NICU"
  },
  {
    "id": "neo_lyte",
    "title": "新生儿电解质、矿物质、微量元素需要量",
    "输出": "每日基础需求",
    "输入": [
      {
        "name": "wt",
        "label": "体重(kg)",
        "type": "number",
        "placeholder": "3"
      }
    ],
    "计算结果": "function(v){return 'Na 2-3mmol/kg, K 1-2mmol/kg, Ca 0.5-1mmol/kg';}",
    "计算公式": "生理消耗法则",
    "公式解读": "维持静脉营养新生儿内环境稳定，防止医源性高钠或脱水。",
    "参考范围": "需依据尿量微调",
    "健康建议": "function(res, v){ return '基础需求配比为：' + res + '。特别提醒：生后前几天新生儿处于生理性少尿和体液重新分布期，此时肾脏排钾能力极弱，必须在确切见到尿液排出后（见尿补钾）方可在静脉液体中加入钾离子。'; }",
    "category": "儿科学",
    "适用人群": "静脉营养新生儿",
    "临床场景": "NICU"
  },
  {
    "id": "neo_jaundice_tx",
    "title": "新生儿黄疸干预指征",
    "输出": "处理建议",
    "输入": [
      {
        "name": "bili",
        "label": "总胆红素(mg/dL)",
        "type": "number",
        "placeholder": "16"
      },
      {
        "name": "age_h",
        "label": "小时龄",
        "type": "number",
        "placeholder": "48"
      }
    ],
    "计算结果": "function(v){return v.bili>15&&v.age_h<=48?'极高危-强烈建议光疗(必要时换血)':'结合Bhutani曲线及风险因素判定';}",
    "计算公式": "胆红素-日龄曲线判断",
    "公式解读": "防控重度高胆红素血症诱发不可逆的胆红素脑病(核黄疸)。",
    "参考范围": "达换血线需争分夺秒",
    "健康建议": "function(res, v){ if(v.bili > 20) return '胆红素浓度达到危险极值！游离胆红素极易穿透血脑屏障沉积于基底节引发核黄疸。必须立即开启强光疗，并做好紧急换血疗法的配血准备。'; return '评估结论：' + res + '。光疗期间必须妥善遮盖患儿双眼和会阴部，并适当增加液量摄入以防不显性失水过多。'; }",
    "category": "儿科学",
    "适用人群": "黄疸新生儿",
    "临床场景": "新生儿科"
  },
  {
    "id": "hie_dx",
    "title": "新生儿缺氧缺血性脑病(HIE)诊断标准和临床分度",
    "输出": "HIE分度",
    "输入": [
      {
        "name": "symp",
        "label": "主要临床表现",
        "type": "select",
        "options": [
          "兴奋/肌张力高/无惊厥(轻度)",
          "嗜睡/肌张力低/有惊厥(中度)",
          "昏迷/肌张力松软/脑干征缺(重度)"
        ]
      }
    ],
    "计算结果": "function(v){return v.symp.includes('轻度')?'轻度HIE':v.symp.includes('中度')?'中度HIE':'重度HIE';}",
    "计算公式": "Sarnat分度临床查体",
    "公式解读": "诊断和分级有明确围产期窒息史新生儿的脑功能损害。",
    "参考范围": "中重度是亚低温的绝对指征",
    "健康建议": "function(res, v){ if(res === '轻度HIE') return '轻度HIE。患儿通常在数天内恢复正常，极少遗留神经系统后遗症，以维持内环境稳定和对症支持为主。'; if(res === '中度HIE') return '中度HIE。强烈建议在生后6小时的黄金窗口期内启动全身或头部亚低温治疗(核心体温降至33.5℃并维持72小时)，这能显著改善远期神经发育预后。'; return '重度HIE。病情极其危重，常伴随多脏器功能衰竭，远期极大概率遗留重度脑瘫或癫痫，需在NICU进行最高级别生命支持。'; }",
    "category": "儿科学",
    "适用人群": "窒息复苏后新生儿",
    "临床场景": "NICU"
  },
  {
    "id": "neo_caloric",
    "title": "新生儿热能的需要量",
    "输出": "目标热卡(kcal/kg/d)",
    "输入": [
      {
        "name": "type",
        "label": "患儿类型",
        "type": "select",
        "options": [
          "足月儿维持",
          "早产儿追赶生长"
        ]
      }
    ],
    "计算结果": "function(v){return v.type.includes('足月')?'100-120 kcal/kg/d':'110-140 kcal/kg/d (肠外需低10-20%)';}",
    "计算公式": "基础代谢+活动+生长+排泄消耗量总和",
    "公式解读": "指导配方奶或静脉营养液的总热量配制标准。",
    "参考范围": "满足体重增长15g/kg/d即可",
    "健康建议": "function(res, v){ if(v.type.includes('早产儿')) return '早产儿由于追赶生长的需求，目标热卡（' + res + '）显著高于足月儿。但必须遵循循序渐进的原则，加奶过快极易诱发致命的坏死性小肠结肠炎(NEC)。'; return '目标热卡为 ' + res + '。长期热卡摄入不足会导致严重的宫外生长迟缓(EUGR)。'; }",
    "category": "儿科学",
    "适用人群": "新生儿",
    "临床场景": "新生儿病房"
  },
  {
    "id": "neo_shock",
    "title": "新生儿休克评分表",
    "输出": "休克风险评估",
    "输入": [
      {
        "name": "crt",
        "label": "毛细血管充盈时间(CRT)",
        "type": "number",
        "placeholder": "4"
      }
    ],
    "计算结果": "function(v){return v.crt>3?'CRT延长，末梢灌注极差，高度警惕休克':'结合心率/血压综合判断';}",
    "计算公式": "肤色+CRT+心率+血压",
    "公式解读": "新生儿休克早期代偿能力极强，中心血压下降往往是极晚期（濒死前）的表现，因此微循环灌注（CRT）是最敏锐的预警信号。",
    "参考范围": "CRT≤2秒为生理正常",
    "健康建议": "function(res, v){ if(v.crt > 3) return '危险预警：CRT高达 ' + v.crt + ' 秒，提示外周微循环已严重缺血缺氧！必须立即建立静脉通路，给予 10-20 mL/kg 生理盐水进行快速扩容试验，并准备多巴胺等血管活性药物。'; return '当前末梢循环尚可。但若存在严重感染史，仍需警惕处于休克代偿期（暖休克）。'; }",
    "category": "儿科学",
    "适用人群": "重症感染或失血新生儿",
    "临床场景": "NICU/急诊"
  },
  {
    "id": "neo_sclerema",
    "title": "新生儿硬肿症评分标准",
    "输出": "硬肿严重度",
    "输入": [
      {
        "name": "s",
        "label": "全身硬肿面积估计(%)",
        "type": "number",
        "placeholder": "30"
      }
    ],
    "计算结果": "function(v){return v.s<20?'轻度':v.s<=50?'中度':'重度(伴多器官损伤高危)';}",
    "计算公式": "四肢+躯干+面部面积加和法则",
    "公式解读": "多见于早产、低出生体重及寒冷损伤患儿，由于皮下脂肪中饱和脂肪酸含量高，在低温下极易凝固硬化，阻断微循环。",
    "参考范围": "面积越大病情越凶险",
    "健康建议": "function(res, v){ if(v.s > 50) return '确诊为重度硬肿症！大面积微循环阻断极易引发肺出血及DIC。救治的核心是复温：重度患儿需放入比其肛温高1-2℃的暖箱中，每小时提高箱温1℃，力争在12-24小时内恢复正常体温。'; return '评级为 ' + res + '。轻度硬肿通常在置入适宜的保温箱自然复温后可逐渐消退，同时需积极治疗肺部感染等原发病。'; }",
    "category": "儿科学",
    "适用人群": "受寒/早产新生儿",
    "临床场景": "NICU"
  },
  {
    "id": "neo_resus_drugs",
    "title": "新生儿窒息复苏常用药物表",
    "输出": "给药剂量及途径",
    "输入": [
      {
        "name": "drug",
        "label": "药物类型",
        "type": "select",
        "options": [
          "肾上腺素(1:10000)",
          "生理盐水(扩容)"
        ]
      }
    ],
    "计算结果": "function(v){return v.drug.includes('肾上腺素')?'0.1-0.3 mL/kg 静脉(IV)快速推注':'10 mL/kg 静脉(IV) (10-20分钟缓慢推注)';}",
    "计算公式": "NRP (新生儿复苏项目) 指南标准剂量",
    "公式解读": "产房及NICU新生儿无心跳或重度心动过缓（正压通气加胸外按压后心率仍<60次/分）的最后防线。",
    "参考范围": "严禁直接使用1:1000原液",
    "健康建议": "function(res, v){ if(v.drug.includes('肾上腺素')) return '推荐剂量：' + res + '。在紧急气管插管后但尚未建立静脉通道时，可通过气管内给药暂代（剂量需加大至 0.5-1 mL/kg），但一旦脐静脉导管(UVC)置入成功，必须立即转为静脉给药以确保药效。'; return '推荐剂量：' + res + '。扩容主要用于明确存在失血（如胎盘早剥、脐带断裂）导致低血容量休克的窒息患儿。'; }",
    "category": "儿科学",
    "适用人群": "重度窒息新生儿",
    "临床场景": "产房急救/手术室"
  },
  {
    "id": "bili_alb",
    "title": "血总胆红素/血白蛋白 (B/A 比值)",
    "输出": "胆红素脑病干预预警指标",
    "输入": [
      {
        "name": "bili",
        "label": "总胆红素(mg/dL)",
        "type": "number",
        "placeholder": "20"
      },
      {
        "name": "alb",
        "label": "白蛋白(g/dL)",
        "type": "number",
        "placeholder": "3"
      }
    ],
    "计算结果": "function(v){return (v.bili/v.alb).toFixed(1);}",
    "计算公式": "TBIL(mg/dL) / ALB(g/dL)",
    "公式解读": "血液中的游离胆红素才能穿透血脑屏障。白蛋白就像运载卡车，当胆红素过多导致卡车满载（饱和）时，游离毒性胆红素急剧增加。",
    "参考范围": "早产儿>0.4，足月儿>0.8 属于极度危险",
    "健康建议": "function(res, v){ if(res > 0.8) return 'B/A比值高达 ' + res + '！这是胆红素脑病（核黄疸）即将发生的最高级别生化预警。即使总胆红素数值尚未突破传统换血线，也具有极其强烈的换血疗法指征。可紧急静脉输注白蛋白以临时结合游离胆红素。'; return 'B/A比值为 ' + res + '，尚处于相对可控范围。但仍需结合患儿日龄及是否存在溶血、窒息等高危因素，决定是否启动强化蓝光治疗。'; }",
    "category": "儿科学",
    "适用人群": "重度高胆红素血症新生儿",
    "临床场景": "NICU"
  },
  {
    "id": "drug_provoc",
    "title": "药物激发试验",
    "输出": "过敏诊断结论",
    "输入": [
      {
        "name": "react",
        "label": "小剂量暴露后是否再现症状",
        "type": "select",
        "options": [
          "是",
          "否"
        ]
      }
    ],
    "计算结果": "function(v){return v.react==='是'?'确诊药物过敏':'排除或不敏感';}",
    "计算公式": "严密监护下小剂量试药证实",
    "公式解读": "当皮试结果存疑时，儿童药物过敏诊断的终极“金标准”。",
    "参考范围": "出现阳性体征即刻确诊并终止试验",
    "健康建议": "function(res, v){ if(res.includes('确诊')) return '试验阳性，确诊对该药物过敏。必须立即将该药物列入患儿的终生禁忌名录，并在病历首页醒目标注。'; return '在极其严密的监护下进行激发试验，具有诱发过敏性休克、喉头水肿的致命风险！必须在具备气管插管条件及常备肾上腺素的重症病房内由专科医生亲自执行。'; }",
    "category": "儿科学",
    "适用人群": "疑难药物过敏患儿",
    "临床场景": "脱敏病房/重症监护"
  },
  {
    "id": "infant_food",
    "title": "婴儿添加辅食的步骤与方法",
    "输出": "阶段性添加原则",
    "输入": [
      {
        "name": "mo",
        "label": "实际月龄",
        "type": "number",
        "placeholder": "6"
      }
    ],
    "计算结果": "function(v){return v.mo<6?'纯母乳或配方奶喂养':v.mo===6?'引入强化铁米粉或肉泥糊':'逐渐过渡到碎末状、丁状半固体食物';}",
    "计算公式": "WHO 6月龄启动辅食原则",
    "公式解读": "锻炼婴儿的咀嚼吞咽功能，并补充6个月后母乳中明显不足的铁质和能量。",
    "参考范围": "按月龄及胃肠道耐受度质地进阶",
    "健康建议": "function(res, v){ if(v.mo === 6) return '此阶段原则：' + res + '。从富含铁的泥糊状食物开始（如强化铁米粉），每次只引入一种新食物，连续观察3-5天，确认无皮疹或腹泻等过敏反应后再尝试下一种。'; if(v.mo < 12) return '此阶段原则：' + res + '。请绝对牢记：1岁以内的婴儿辅食中严禁添加任何盐、酱油或蜂蜜！婴儿肾脏极度脆弱，过高的钠负荷会造成不可逆的肾损伤。'; return '婴儿已过周岁，可逐渐过渡至与成人相似的清淡家庭饮食，但仍需避免坚果整粒吞食以防气道异物。'; }",
    "category": "儿科学",
    "适用人群": "健康婴儿",
    "临床场景": "儿保门诊/社区宣教"
  },
  {
    "id": "infant_hf",
    "title": "婴儿心衰分级评分表 (改良Ross)",
    "输出": "心衰等级",
    "输入": [
      {
        "name": "s",
        "label": "总分(0-12)",
        "type": "number",
        "placeholder": "4"
      }
    ],
    "计算结果": "function(v){return v.s<=2?'无心力衰竭':v.s<=6?'轻度心衰':v.s<=9?'中度心衰':'重度心衰失代偿';}",
    "计算公式": "出汗+呼吸+呼吸做功+肝脏肿大等体征加权",
    "公式解读": "细化婴儿期因先天性心脏病（如室缺VSD）导致的心力衰竭程度。",
    "参考范围": "分高提示失代偿",
    "健康建议": "function(res, v){ if(v.s > 6) return '评估为 ' + res + '。婴儿心脏储备极差，随时可能因呼吸道感染诱发急性心衰死亡。必须立即使用利尿剂（呋塞米）、强心剂（地高辛）或血管扩张剂（卡托普利）进行干预，并紧急请心外科会诊评估先心病根治手术时机。'; return '评估为 ' + res + '。喂养困难（吃奶费力、满头大汗）是婴儿心衰最早期、最敏锐的体征，一旦出现需高度警惕。'; }",
    "category": "儿科学",
    "适用人群": "先天性心脏病婴儿",
    "临床场景": "小儿心内科/心胸外科"
  },
  {
    "id": "infant_nutrients",
    "title": "婴儿营养素的需要",
    "输出": "三大宏量营养基础摄入量",
    "输入": [
      {
        "name": "wt",
        "label": "婴儿体重(kg)",
        "type": "number",
        "placeholder": "5"
      }
    ],
    "计算结果": "function(v){return '热量: 100kcal/kg; 液体: 150ml/kg; 蛋白质: 1.5-3g/kg';}",
    "计算公式": "基础代谢与极高生长速度需求定式",
    "公式解读": "指导婴幼儿日常母乳不足时的配方奶粉冲调量及总摄入量计算。",
    "参考范围": "必须按每公斤体重严格给与",
    "健康建议": "function(res, v){ return '基础营养需求为：' + res + '。配方奶粉必须严格按照罐体说明的比例冲调。冲调过浓会显著增加婴儿脆弱肾脏的渗透质负荷引发脱水；冲调过稀则会导致严重的水中毒及营养不良。'; }",
    "category": "儿科学",
    "适用人群": "健康或轻度生病婴儿",
    "临床场景": "儿保科/临床营养科"
  },
  {
    "id": "preterm_wt",
    "title": "早产儿体重增长速度",
    "输出": "理想日增重幅度",
    "输入": [
      {
        "name": "phase",
        "label": "生长阶段",
        "type": "select",
        "options": [
          "生后生理性体重下降期",
          "恢复出生体重后"
        ]
      }
    ],
    "计算结果": "function(v){return v.phase.includes('恢复')?'15-20 g/kg/day (追赶生长标准)':'正常下降幅度不超过出生体重的10-15%';}",
    "计算公式": "宫内生长曲线参考(Fenton量表)",
    "公式解读": "评估早产儿营养摄入是否达标、决定其能否安全出院的金指标。",
    "参考范围": "低于 10g/kg/d 诊断为重度宫外生长发育迟缓(EUGR)",
    "健康建议": "function(res, v){ if(v.phase.includes('恢复')) return '当前阶段目标：' + res + '。只有当体重稳定达到该增长速率，且能够经口完全自主喂养时，早产儿方可安全出院。出院后强烈建议使用含有更高热量及蛋白质的早产儿出院后配方奶(PDF)进行营养强化，直至矫正胎龄满足月。'; return '早期目标：' + res + '。极低出生体重儿的生理性脱水期较长，若体重下降过多，需排查是否存在隐匿的失水或营养液输注不足。'; }",
    "category": "儿科学",
    "适用人群": "早产及低出生体重儿",
    "临床场景": "NICU/高危儿随访门诊"
  },
  {
    "id": "wt_ht_est",
    "title": "正常儿童体重身高估计公式",
    "输出": "预估生理指标",
    "输入": [
      {
        "name": "age",
        "label": "年龄(仅限2-12岁)",
        "type": "number",
        "placeholder": "5"
      }
    ],
    "计算结果": "function(v){return '估测体重: '+(v.age*2+8)+' kg; 估测身高: '+(v.age*7+75)+' cm';}",
    "计算公式": "Wt = 岁×2+8; Ht = 岁×7+75",
    "公式解读": "儿科医学史上最经典的速算公式，主要用于抢救现场或无条件称重时的紧急药量估算。",
    "参考范围": "仅适用于2岁至青春期前",
    "健康建议": "function(res, v){ return '预估结果：' + res + '。特别提醒：由于现代儿童普遍存在营养过剩现象，此经典公式计算出的体重往往【显著低于】当今儿童的真实体重。临床常规用药时，条件允许的情况下必须使用电子秤进行实测给药！此公式仅作抢救兜底。'; }",
    "category": "儿科学",
    "适用人群": "学龄前至学龄期儿童",
    "临床场景": "儿科急诊预检/院前急救"
  },
  {
    "id": "mod_ross",
    "title": "改良Ross心力衰竭分级",
    "输出": "心衰定性分级标准",
    "输入": [
      {
        "name": "symp",
        "label": "喂养及发育表现",
        "type": "select",
        "options": [
          "无症状",
          "轻度多汗/呼吸急促但生长正常",
          "喂养困难/生长停滞",
          "静息状态下即有呼吸困难"
        ]
      }
    ],
    "计算结果": "function(v){return v.symp.includes('无')?'I级':v.symp.includes('轻')?'II级':v.symp.includes('停滞')?'III级':'IV级(最重)';}",
    "计算公式": "心衰体征定性分级描述",
    "公式解读": "将成人的NYHA心衰分级完美转化为适用于婴幼儿的临床评估标准。",
    "参考范围": "I级(代偿) 至 IV级(极重度失代偿)",
    "健康建议": "function(res, v){ if(res.includes('III级') || res.includes('IV级')) return '评估为 ' + res + '。患儿已处于重度心力衰竭的失代偿悬崖边缘。由于进食耗氧量极大，必须立即停止经口喂养改为鼻饲或静脉营养，并强制卧床、应用利尿扩血管药物，择期尽快完成先心病外科解剖矫治。'; return '评估为 ' + res + '。心功能代偿尚可，注意预防呼吸道合胞病毒等感染诱发心衰加重。'; }",
    "category": "儿科学",
    "适用人群": "先天性心脏病/心肌病儿童",
    "临床场景": "小儿心血管内科病房"
  },
  {
    "id": "pa_bernoulli",
    "title": "肺动脉压估测 (Bernoulli方程式)",
    "输出": "肺动脉收缩压估算值 (sPAP)",
    "输入": [
      {
        "name": "v",
        "label": "超声测得三尖瓣反流速度(m/s)",
        "type": "number",
        "placeholder": "3"
      },
      {
        "name": "rap",
        "label": "估测右心房压(RAP, mmHg)",
        "type": "number",
        "placeholder": "5"
      }
    ],
    "计算结果": "function(v){return Math.round(4*v.v*v.v + v.rap);}",
    "计算公式": "4 × V² + 右房压",
    "公式解读": "心超科通过无创多普勒技术评估儿童肺动脉高压(PAH)的核心物理方程。",
    "参考范围": ">25mmHg 提示轻度高压; >50mmHg 提示重度",
    "健康建议": "function(res, v){ if(res > 50) return 'sPAP估测值高达 ' + res + ' mmHg！提示存在重度肺动脉高压（如艾森曼格综合征前期）。对于室缺(VSD)或动脉导管未闭(PDA)患儿，这往往是决定其是否已经错失了外科手术关闭缺损最后机会的生死线，需立即行右心导管检查确诊。'; return '肺动脉收缩压估测为 ' + res + ' mmHg。数值若轻度升高，在左向右分流型先心病中属动力性改变，早期手术后通常可逆转恢复正常。'; }",
    "category": "儿科学",
    "适用人群": "先心病及肺血管疾病患儿",
    "临床场景": "心脏超声诊断室/心胸外科"
  },
  {
    "id": "brain_death",
    "title": "中国儿童脑死亡判定标准",
    "输出": "判定先决条件评估",
    "输入": [
      {
        "name": "cond",
        "label": "当前深昏迷原因",
        "type": "select",
        "options": [
          "明确的灾难性脑损伤(已排除可逆因素)",
          "原因不明或合并中毒/低温/内分泌异常"
        ]
      }
    ],
    "计算结果": "function(v){return v.cond.includes('明确')?'满足先决条件，可启动正式判定流程':'绝对严禁启动判定';}",
    "计算公式": "临床判定+确认试验双盲规范",
    "公式解读": "儿童脑发育潜力大，脑死亡判定极其慎重。年龄越小，两次临床判定间隔观察时间必须越长（婴儿至少24小时，年长儿至少12小时）。",
    "参考范围": "必须通过脑干反射消失、自主呼吸诱发试验及脑电图等证实",
    "健康建议": "function(res, v){ if(res.includes('严禁')) return '警告：' + res + '！在未彻底排除镇静药物残留、严重低温、严重电解质及酸碱失衡等可逆性因素之前，任何神经学反射的消失都可能是假象，绝不允许下达脑死亡结论。'; return '评估结论：' + res + '。判定必须由两名具备专门资质的资深神经科或ICU医师独立执行，且确认试验（如脑电图平息、TCD脑血流停止）必须存在一项以上阳性方可最终宣判。'; }",
    "category": "儿科学",
    "适用人群": "极重型脑损伤深昏迷儿童",
    "临床场景": "PICU/器官捐献评估"
  },
  {
    "id": "osi",
    "title": "氧饱和度指数 (OSI)",
    "输出": "OSI 严重度数值",
    "输入": [
      {
        "name": "map",
        "label": "呼吸机平均气道压(MAP, cmH2O)",
        "type": "number",
        "placeholder": "12"
      },
      {
        "name": "fio2",
        "label": "呼吸机吸氧浓度(FiO2, %)",
        "type": "number",
        "placeholder": "60"
      },
      {
        "name": "spo2",
        "label": "无创经皮血氧饱和度(SpO2, %)",
        "type": "number",
        "placeholder": "90"
      }
    ],
    "计算结果": "function(v){return Math.round((v.map * v.fio2) / v.spo2 * 10)/10;}",
    "计算公式": "MAP × FiO2(%) / SpO2",
    "公式解读": "当患儿无法频繁抽取动脉血气分析获取PaO2时，完美替代氧合指数(OI)来评估儿童ARDS(急性呼吸窘迫综合征)肺损伤严重程度的新兴金标准。",
    "参考范围": "OSI数值越高，代表肺泡塌陷及氧合障碍越深",
    "健康建议": "function(res, v){ if(res >= 7.5) return 'OSI高达 ' + res + '，符合重度儿童ARDS诊断标准！常规机械通气面临极大失败风险。必须考虑立即实施俯卧位通气、高频振荡通气(HFOV)或请体外生命支持团队紧急评估ECMO上机指征。'; if(res >= 5) return '中度ARDS。需优化呼吸机PEEP设置以实现肺复张，严密防范气胸发生。'; return '肺部氧合状态尚可维持，继续原方案通气支持。'; }",
    "category": "儿科学",
    "适用人群": "有创机械通气重症患儿",
    "临床场景": "PICU"
  },
  {
    "id": "nc_fio2",
    "title": "鼻导管吸入氧浓度估算",
    "输出": "预期吸入氧浓度 FiO2 (%)",
    "输入": [
      {
        "name": "flow",
        "label": "氧气流量表设定值(L/min)",
        "type": "number",
        "placeholder": "2"
      }
    ],
    "计算结果": "function(v){return Math.min(21 + 4 * v.flow, 40);}",
    "计算公式": "空气氧21% + 4 × 氧气流量",
    "公式解读": "极简估算在开放式普通鼻导管供氧下，患儿气道内实际吸入混合气体的氧气百分比浓度。",
    "参考范围": "受患儿呼吸频率影响，估算值最高不超过 40-44%",
    "健康建议": "function(res, v){ return '理论吸入氧浓度约为 ' + res + '%。警告：由于儿童鼻腔容积小，普通鼻导管氧流量通常绝不应超过 2-3 L/min。过高的流量不仅无法有效提升FiO2，反而会引发极其严重的鼻黏膜干燥、出血及气压伤。若患儿缺氧仍未缓解，必须更换为文丘里面罩或高流量鼻导管(HFNC)。'; }",
    "category": "儿科学",
    "适用人群": "普通病房轻中度缺氧患儿",
    "临床场景": "儿科急诊/普通病房"
  },
  {
    "id": "cao2",
    "title": "动脉血氧含量 (CaO2)",
    "输出": "绝对携氧物理含量 (mL/dL)",
    "输入": [
      {
        "name": "hb",
        "label": "血红蛋白浓度(Hb, g/dL)",
        "type": "number",
        "placeholder": "12"
      },
      {
        "name": "sao2",
        "label": "动脉血氧饱和度(SaO2, 填小数)",
        "type": "number",
        "placeholder": "0.95"
      },
      {
        "name": "pao2",
        "label": "动脉氧分压(PaO2, mmHg)",
        "type": "number",
        "placeholder": "80"
      }
    ],
    "计算结果": "function(v){return Math.round((1.34 * v.hb * v.sao2 + 0.0031 * v.pao2)*10)/10;}",
    "计算公式": "1.34×Hb×SaO2(结合氧) + 0.0031×PaO2(溶解氧)",
    "公式解读": "血液中实际装载氧气的总“物理货量”。揭示了一个深刻的临床真理：血氧饱和度达到100%，并不代表全身脏器不缺氧。",
    "参考范围": "健康儿童约为 16-20 mL/dL",
    "健康建议": "function(res, v){ if(v.hb < 7 && v.sao2 > 0.95) return '虽然监护仪上血氧饱和度极好，但由于严重贫血(Hb过低)，血液的实际携氧总量仅为 ' + res + ' mL/dL！患儿正处于极其危险的组织缺氧边缘。单纯调高呼吸机氧浓度毫无意义，必须立即全血或红细胞输注复苏。'; return '计算出的动脉血氧含量为 ' + res + ' mL/dL，处于生理可接受范畴，全身氧供基本盘稳定。'; }",
    "category": "儿科学",
    "适用人群": "休克、发绀、重度贫血患儿",
    "临床场景": "PICU血流动力学深度剖析"
  },
  {
    "id": "oi_index",
    "title": "氧合指数 (OI)",
    "输出": "OI 严重度数值",
    "输入": [
      {
        "name": "map",
        "label": "呼吸机平均气道压(MAP, cmH2O)",
        "type": "number",
        "placeholder": "15"
      },
      {
        "name": "fio2",
        "label": "呼吸机吸氧浓度(FiO2, %)",
        "type": "number",
        "placeholder": "80"
      },
      {
        "name": "pao2",
        "label": "动脉血气氧分压(PaO2, mmHg)",
        "type": "number",
        "placeholder": "60"
      }
    ],
    "计算结果": "function(v){return Math.round((v.map * v.fio2) / v.pao2 * 10)/10;}",
    "计算公式": "MAP × FiO2(%) / PaO2",
    "公式解读": "全球诊断儿童急性呼吸窘迫综合征(ARDS)及分级的最高级别生化金标准。完美整合了呼吸机的治疗压力代价与最终获取的血氧回报。",
    "参考范围": "<4(轻度); 4-8(轻中); 8-16(中度); >16(重度)",
    "健康建议": "function(res, v){ if(res > 40) return '极其致命的氧合衰竭！OI高达 ' + res + '。常规呼吸机治疗已彻底宣告失效，患儿肺脏已失去气体交换能力。这是启动体外膜肺氧合(ECMO)挽救生命的强烈且绝对的医学指征！'; if(res > 16) return '重度ARDS（OI=' + res + '）。随时可能发生低氧性心脏停搏，需启用肌肉松弛剂并尝试所有高级肺复张策略。'; return '当前肺损伤及氧合障碍程度为 ' + res + '，属临床可接受范围内。'; }",
    "category": "儿科学",
    "适用人群": "确诊严重肺损伤机械通气患儿",
    "临床场景": "PICU及NICU"
  },
  {
    "id": "ebv",
    "title": "血容量估算 (BV)",
    "输出": "总血容量 (mL)",
    "输入": [
      {
        "name": "wt",
        "label": "体重(kg)",
        "type": "number",
        "placeholder": "5"
      },
      {
        "name": "type",
        "label": "年龄段",
        "type": "select",
        "options": [
          "婴儿 (约80ml/kg)",
          "儿童 (约70ml/kg)"
        ]
      }
    ],
    "计算结果": "function(v){return v.type.includes('婴儿')?v.wt*80:v.wt*70;}",
    "计算公式": "体重 × 年龄常数系数",
    "公式解读": "计算患儿全身血液总体积。儿童血容量绝对值小，轻微的出血即可导致失血性休克。",
    "参考范围": "早产儿可达90ml/kg，足月新生儿85ml/kg",
    "健康建议": "function(res, v){ return '患儿估算总血容量为 ' + res + ' mL。儿科创伤及外科手术时，由于整体血容量基数极小，几十毫升的急性失血即可能达到失血性休克阈值。必须极其严密地对失血量进行称重计算并及时启动成分血复苏。'; }",
    "category": "儿科学",
    "适用人群": "小儿外科/创伤患儿",
    "临床场景": "手术室/急诊抢救"
  },
  {
    "id": "blood_loss_hct",
    "title": "失血量简易估算 (基于Hct)",
    "输出": "估算失血量 (mL)",
    "输入": [
      {
        "name": "ebv",
        "label": "已预估的总血容量(mL)",
        "type": "number",
        "placeholder": "800"
      },
      {
        "name": "hct0",
        "label": "受伤前基础Hct(%)",
        "type": "number",
        "placeholder": "40"
      },
      {
        "name": "hct1",
        "label": "当前实测Hct(%)",
        "type": "number",
        "placeholder": "30"
      }
    ],
    "计算结果": "function(v){return Math.round(v.ebv * (v.hct0 - v.hct1) / v.hct0);}",
    "计算公式": "总血容量 × (Hct前 - Hct后) / Hct前",
    "公式解读": "基于红细胞压积(Hct)被组织间液或复苏液体稀释的物理降幅，逆推丢失的绝对血液体积。",
    "参考范围": "需结合生命体征动态评估",
    "健康建议": "function(res, v){ return '推算急性失血量约为 ' + res + ' mL。强烈提示：在急性大出血发生的极早期，由于血管内液体尚未发生组织间隙的代偿性转移（血液未稀释），Hct往往不下降！此公式仅适用于出血后已有大量液体复苏的患儿作回顾性或动态参考。'; }",
    "category": "儿科学",
    "适用人群": "创伤/消化道大出血患儿",
    "临床场景": "急诊/PICU"
  },
  {
    "id": "egfr_epi_2021_standard",
    "title": "eGFR 估算 (CKD-EPI 2021 公式)",
    "version": "3.0",
    "输出": "估算肾小球滤过率 (eGFR)",
    "输入": [
      {
        "name": "gender",
        "label": "1. 性别",
        "type": "radio",
        "options": [
          "男 (系数 1.0)",
          "女 (系数 1.012)"
        ]
      },
      {
        "name": "age",
        "label": "2. 年龄 (岁)",
        "type": "number",
        "placeholder": "适用于 18 岁及以上成人"
      },
      {
        "name": "scr",
        "label": "3. 血肌酐 (μmol/L)",
        "type": "number",
        "placeholder": "请输入检测值"
      }
    ],
    "计算结果": "function(v){ if(!v.gender || !v.age || !v.scr) return '等待参数...'; var scr_mg = v.scr / 88.4; var isFemale = v.gender.includes('女'); var k = isFemale ? 0.7 : 0.9; var a = isFemale ? -0.241 : -0.302; var f = isFemale ? 1.012 : 1.0; var res = 142 * Math.pow(Math.min(scr_mg / k, 1), a) * Math.pow(Math.max(scr_mg / k, 1), -1.2) * Math.pow(0.9938, v.age) * f; var stage = ''; if(res >= 90) stage = 'G1期 (正常)'; else if(res >= 60) stage = 'G2期 (轻度下降)'; else if(res >= 45) stage = 'G3a期 (轻中度下降)'; else if(res >= 30) stage = 'G3b期 (中重度下降)'; else if(res >= 15) stage = 'G4期 (重度下降)'; else stage = 'G5期 (肾衰竭)'; return res.toFixed(1) + ' mL/min/1.73㎡ (' + stage + ')'; }",
    "计算公式": "CKD-EPI 2021 Race-Free Equation",
    "公式解读": "决策逻辑：1. 2021版公式移除了『种族』偏置，对所有人一视同仁；2. 针对性别与肌酐浓度进行了精细的幂运算分割；3. 计算结果是 CKD 分期的金标准。注意：公式中 Scr 已自动从 μmol/L 换算为 mg/dL。",
    "参考范围": "正常值通常 > 90 mL/min/1.73㎡；持续 < 60 超过 3 个月可诊断为慢性肾脏病。",
    "健康建议": "function(res, v){ var val = parseFloat(res); if(val < 15){ return '【G5期 肾衰竭】1. 需尽快咨询肾内科专家；2. 评估腹膜/血液透析或肾移植时机；3. 严格限制磷、钾及水分摄入。'; } if(val < 30){ return '【G4期 重度损害】1. 每 3 个月复查一次肾功；2. 纠正肾性贫血及钙磷代谢紊乱；3. 避免任何潜在肾毒性药物。'; } if(val < 60){ return '【G3期 中度损害】1. 强化血压管理 (<130/80)；2. 启动 SGLT2i 或 RASi 治疗以延缓进展；3. 评估心血管事件风险。'; } return '【功能良好/代偿】请维持健康生活方式。若有糖尿病或高血压，请严密监测尿蛋白情况。'; }",
    "category": "儿科学",
    "适用人群": "疑似或确诊慢性肾脏病成人患者",
    "clinical_scenario": "肾功能水平评估、CKD 诊断分期、化疗及抗生素药物调量参考"
  },
  {
    "id": "gcs_ped_mod",
    "title": "儿童改良格拉斯哥昏迷评分 (GCS)",
    "输出": "昏迷分级与深度",
    "输入": [
      {
        "name": "e",
        "label": "睁眼反应(1-4分)",
        "type": "number",
        "placeholder": "4"
      },
      {
        "name": "v",
        "label": "语言反应(婴儿按哭闹安抚计, 1-5分)",
        "type": "number",
        "placeholder": "4"
      },
      {
        "name": "m",
        "label": "运动反应(1-6分)",
        "type": "number",
        "placeholder": "6"
      }
    ],
    "计算结果": "function(v){var s=v.e+v.v+v.m; return s+'分 - '+(s<=8?'重型颅脑损伤':s<=12?'中型':'轻型');}",
    "计算公式": "E + V + M (针对不会言语的婴幼儿进行了专项词条替换)",
    "公式解读": "通过对睁眼、运动及啼哭安抚反应的量化，评判无法正常言语交流的婴幼儿大脑皮层受损程度。",
    "参考范围": "≤8分提示重度深昏迷",
    "健康建议": "function(res, v){ if(res.includes('重型')) return '评分极低（' + res + '），提示患儿处于深昏迷状态。自身气道保护反射已彻底丧失，必须立即进行气管插管以防窒息或误吸，并紧急行影像学检查排查脑疝。'; return '评估结论为 ' + res + '。即使是轻中型颅脑损伤，也需在随后24小时内密切动态监测神经功能轨迹，谨防迟发性颅内血肿。'; }",
    "category": "儿科学",
    "适用人群": "婴幼儿及各年龄段儿童",
    "临床场景": "急诊创伤/神经外科"
  },
  {
    "id": "o2er",
    "title": "氧摄取率 (O2ER)",
    "输出": "组织氧气摄取比率 (%)",
    "输入": [
      {
        "name": "sao2",
        "label": "动脉血氧饱和度(%)",
        "type": "number",
        "placeholder": "98"
      },
      {
        "name": "svo2",
        "label": "中心静脉血氧饱和度(ScvO2, %)",
        "type": "number",
        "placeholder": "70"
      }
    ],
    "计算结果": "function(v){return Math.round((v.sao2 - v.svo2) / v.sao2 * 100);}",
    "计算公式": "(SaO2 - SvO2) / SaO2 × 100%",
    "公式解读": "反映全身组织从流经的血液中实际抽走氧气的比例。是评估全身氧供与氧耗是否处于致命失衡状态的最顶级血流动力学参数。",
    "参考范围": "正常约 22% - 30%",
    "健康建议": "function(res, v){ if(res > 30) return 'O2ER高达 ' + res + '%！提示组织正处于极度缺氧状态。机体只能通过超常提取血液中的氧气来勉强代偿。这通常是心排血量严重不足（心源性休克）或极度高代谢（重度脓毒症）的危险信号，需立即提升氧供（如输血、强心）。'; return 'O2ER为 ' + res + '%。提示全身整体的氧气供应与组织消耗处于相对安全的平衡状态。'; }",
    "category": "儿科学",
    "适用人群": "留置中心静脉导管的危重症患儿",
    "临床场景": "PICU血流动力学监测"
  },
  {
    "id": "uvc_depth",
    "title": "脐静脉置管 (UVC) 深度规则",
    "输出": "预估导管置入深度 (cm)",
    "输入": [
      {
        "name": "wt",
        "label": "新生儿体重(kg)",
        "type": "number",
        "placeholder": "2"
      }
    ],
    "计算结果": "function(v){return (v.wt * 1.5 + 5.5).toFixed(1);}",
    "计算公式": "体重 × 1.5 + 5.5",
    "公式解读": "确保高渗营养液及血管活性药物直接进入中央大静脉的安全推算法则。",
    "参考范围": "X线确认尖端位于膈肌上方0.5-1cm",
    "健康建议": "function(res, v){ return '估算UVC最佳置入深度为 ' + res + ' cm。置管后必须立即通过床旁X线胸腹片确认。若导管尖端过深穿过右心房，极易引发致命性的心律失常或刺透心肌导致心包填塞；若过浅停留在肝内门静脉，则会导致肝组织坏死。'; }",
    "category": "儿科学",
    "适用人群": "极低出生体重儿及危重新生儿",
    "临床场景": "NICU抢救与中心静脉建立"
  },
  {
    "id": "cvc_depth",
    "title": "中心静脉导管 (CVC) 穿刺深度",
    "输出": "预期置入深度 (cm)",
    "输入": [
      {
        "name": "ht",
        "label": "患儿身高(cm)",
        "type": "number",
        "placeholder": "100"
      },
      {
        "name": "site",
        "label": "穿刺入路",
        "type": "select",
        "options": [
          "右颈内静脉/锁骨下静脉",
          "左侧静脉系统入路"
        ]
      }
    ],
    "计算结果": "function(v){return v.site.includes('右')?(v.ht/10).toFixed(1):((v.ht/10)+1.5).toFixed(1);}",
    "计算公式": "身高/10 (右侧标准); 左侧需加深1.5cm",
    "公式解读": "迅速估算导管尖端到达上腔静脉中下1/3段（最安全位置）的理论深度。",
    "参考范围": "严格依靠腔内全波心电图或摄片验证",
    "健康建议": "function(res, v){ return '预估安全置入深度为 ' + res + ' cm。左侧入路由于跨越纵隔距离较长，通常比右侧需多插入1-2cm。操作完毕后必须进行影像学验证，严禁导管尖端深入右心房内。'; }",
    "category": "儿科学",
    "适用人群": "需输注血管活性药或全静脉营养的儿童",
    "临床场景": "PICU/手术麻醉室"
  },
  {
    "id": "vis_score",
    "title": "血管活性药物评分 (VIS)",
    "输出": "VIS 总负荷数值",
    "输入": [
      {
        "name": "dopa",
        "label": "多巴胺泵速 (μg/kg/min)",
        "type": "number",
        "placeholder": "5"
      },
      {
        "name": "epi",
        "label": "肾上腺素泵速 (μg/kg/min)",
        "type": "number",
        "placeholder": "0.1"
      },
      {
        "name": "norepi",
        "label": "去甲肾上腺素泵速 (μg/kg/min)",
        "type": "number",
        "placeholder": "0.1"
      }
    ],
    "计算结果": "function(v){return v.dopa + v.epi*100 + v.norepi*100;}",
    "计算公式": "多巴胺 + 100×肾上腺素 + 100×去甲肾",
    "公式解读": "将各类强心、升压药物按照心脏受体亲和力折算成统一的积分。直观量化循环衰竭患者所需的心血管总支持力度。",
    "参考范围": ">15分提示心血管功能严重受损",
    "健康建议": "function(res, v){ if(res > 15) return 'VIS总分极高（' + res + '）！说明患儿自身循环系统已彻底崩溃，正依赖大剂量强心血管活性药物强行维持血压。这强烈预示着脓毒性休克或重症心肌炎的死亡率大幅增加，需评估是否有指征启动ECMO。'; return '当前VIS评分为 ' + res + '。请根据动脉血压及乳酸清除率的动态变化，平稳滴定泵注速率。'; }",
    "category": "儿科学",
    "适用人群": "休克及心脏术后维持循环的儿童",
    "临床场景": "PICU/小儿心脏监护室(CCU)"
  },
  {
    "id": "cath_size",
    "title": "小儿导尿管型号选择",
    "输出": "推荐尿管型号 (Fr)",
    "输入": [
      {
        "name": "age",
        "label": "患儿年龄(岁)",
        "type": "number",
        "placeholder": "4"
      }
    ],
    "计算结果": "function(v){return (v.age/2 + 8).toFixed(1);}",
    "计算公式": "年龄 / 2 + 8",
    "公式解读": "快速测算小儿泌尿系解剖容受度的经验公式，防范医源性尿道损伤。",
    "参考范围": "新生儿通常选用 5-6 Fr",
    "健康建议": "function(res, v){ return '建议准备 ' + res + ' Fr 规格的导尿管。小儿尿道黏膜极其脆弱娇嫩，操作前必须使用足量石蜡油或利多卡因凝胶润滑。如遇明显阻力切忌暴力盲插，以免造成不可挽回的尿道撕裂或假道形成。'; }",
    "category": "儿科学",
    "适用人群": "需导尿监控尿量或解除尿潴留儿童",
    "临床场景": "急诊科/各科病房"
  },
  {
    "id": "normal_uo",
    "title": "正常儿童尿量监测下限估计",
    "输出": "少尿警戒线 (mL/kg/h)",
    "输入": [
      {
        "name": "age_group",
        "label": "年龄分段",
        "type": "select",
        "options": [
          "婴儿期",
          "儿童期",
          "青少年期"
        ]
      }
    ],
    "计算结果": "function(v){return v.age_group==='婴儿期'?'2.0 - 3.0 mL/kg/h':v.age_group==='儿童期'?'1.0 - 2.0 mL/kg/h':'0.5 - 1.0 mL/kg/h';}",
    "计算公式": "临床年龄生理常模",
    "公式解读": "判定是否发生少尿(Oliguria)或急性肾损伤(AKI)的基础红线。",
    "参考范围": "持续低于下限超6小时即为AKI危险期",
    "健康建议": "function(res, v){ return '该年龄段的正常尿量应维持在 ' + res + ' 以上。尿量的锐减往往早于血压下降，是休克和重度脱水最敏锐的早期观察窗口。一旦连续监测低于此警戒线，需立即排查肾前性血容量不足或肾后性梗阻。'; }",
    "category": "儿科学",
    "适用人群": "全年龄段住院儿童",
    "临床场景": "全科护理观察/液体平衡管理"
  },
  {
    "id": "blood_loss_hb",
    "title": "失血量简易估算 (基于血红蛋白Hb)",
    "输出": "推算失血容积 (mL)",
    "输入": [
      {
        "name": "ebv",
        "label": "患儿预估血容量(mL)",
        "type": "number",
        "placeholder": "1000"
      },
      {
        "name": "hb0",
        "label": "失血前基础Hb (g/L)",
        "type": "number",
        "placeholder": "120"
      },
      {
        "name": "hb1",
        "label": "急诊复查实测Hb (g/L)",
        "type": "number",
        "placeholder": "90"
      }
    ],
    "计算结果": "function(v){return Math.round(v.ebv * (v.hb0 - v.hb1) / v.hb0);}",
    "计算公式": "总血容量 × (Hb降幅 / 基础Hb)",
    "公式解读": "通过血液中血红蛋白浓度的稀释稀释效应，粗略物理倒推流失的血量。",
    "参考范围": "仅适用于复苏扩容后的回顾性测算",
    "健康建议": "function(res, v){ return '根据血红蛋白降幅，推算累积失血量约为 ' + res + ' mL。儿科输血指征不能仅看Hb的绝对数值，必须结合患儿是否存在活动性持续出血、乳酸是否异常升高以及整体血流动力学状态综合决定。'; }",
    "category": "儿科学",
    "适用人群": "外伤大出血及消化道出血患儿",
    "临床场景": "急诊外科/PICU输血评估"
  },
  {
    "id": "fibrinogen",
    "title": "人纤维蛋白原 (FIB) 补充剂量估算",
    "输出": "推荐补充剂量 (g)",
    "输入": [
      {
        "name": "wt",
        "label": "患儿体重(kg)",
        "type": "number",
        "placeholder": "20"
      },
      {
        "name": "target",
        "label": "目标浓度(常设为1.5 g/L)",
        "type": "number",
        "placeholder": "1.5"
      },
      {
        "name": "real",
        "label": "化验室实测FIB浓度(g/L)",
        "type": "number",
        "placeholder": "0.5"
      }
    ],
    "计算结果": "function(v){return Math.round((v.target - v.real) * v.wt * 0.05 * 10)/10;}",
    "计算公式": "(目标浓度 - 实测浓度) × 体重 × 0.05",
    "公式解读": "纠正弥散性血管内凝血(DIC)或大量失血(创伤/手术)导致的凝血底物严重消耗。",
    "参考范围": "每输入1g可使血浆FIB提升约0.5g/L",
    "健康建议": "function(res, v){ return '推算需静脉补充纤维蛋白原制剂 ' + res + ' g。当FIB<1.0g/L且伴随活动性出血时，是极其强烈的补充指征。若患者存在难以控制的大出血及高纤溶状态，建议将靶目标浓度上调至 1.5 - 2.0 g/L。'; }",
    "category": "儿科学",
    "适用人群": "严重凝血功能障碍或大出血儿童",
    "临床场景": "PICU/急救手术室"
  },
  {
    "id": "na_glu",
    "title": "高血糖时血钠浓度物理校正",
    "输出": "校正后真实血钠 (mmol/L)",
    "输入": [
      {
        "name": "na",
        "label": "生化实测血钠(mmol/L)",
        "type": "number",
        "placeholder": "130"
      },
      {
        "name": "glu",
        "label": "实测血糖(mmol/L)",
        "type": "number",
        "placeholder": "30"
      }
    ],
    "计算结果": "function(v){return Math.round((v.na + 1.6 * (v.glu - 5.5) / 5.5) * 10)/10;}",
    "计算公式": "实测Na + 1.6 × (Glu-5.5) / 5.5",
    "公式解读": "极高浓度的血糖分子会产生巨大的渗透吸水作用，将细胞内的游离水强行拉入血管内，导致血清钠被物理稀释，产生“假性低钠血症”。",
    "参考范围": "用于还原机体真实的钠盐与水分代谢盈亏",
    "健康建议": "function(res, v){ if(res > 145) return '经高糖假性稀释效应校正后，患者的真实血钠其实高达 ' + res + ' mmol/L！这说明机体已经因极度利尿丢失了海量的水分（严重高渗性脱水）。在抢救此类糖尿病酮症酸中毒(DKA)患儿时，必须依此数据调整静脉补液的张力，严防脑水肿致死。'; return '校正后真实血清钠水平为 ' + res + ' mmol/L。此数值可作为接下来制定静脉补液处方渗透压强度的基准。'; }",
    "category": "儿科学",
    "适用人群": "糖尿病酮症酸中毒(DKA)患儿",
    "临床场景": "重症内分泌急救/PICU"
  },
  {
    "id": "gir",
    "title": "葡萄糖输注速率 (GIR)",
    "输出": "GIR 绝对速率 (mg/kg/min)",
    "输入": [
      {
        "name": "rate",
        "label": "输液泵设定速度(mL/h)",
        "type": "number",
        "placeholder": "10"
      },
      {
        "name": "conc",
        "label": "葡萄糖液体浓度(%)",
        "type": "number",
        "placeholder": "10"
      },
      {
        "name": "wt",
        "label": "患儿体重(kg)",
        "type": "number",
        "placeholder": "2.5"
      }
    ],
    "计算结果": "function(v){return Math.round((v.rate * v.conc * 10) / (60 * v.wt) * 10)/10;}",
    "计算公式": "(速度 × 浓度) / (6 × 体重)",
    "公式解读": "新生儿及早产儿静脉营养输糖的“物理车速表”。通过严密控制该速率，防止医源性高血糖或低血糖脑损伤。",
    "参考范围": "足月儿通常 4-6 起步，早产儿 6-8 启动",
    "健康建议": "function(res, v){ if(res > 12) return '危险：糖速过快（' + res + ' mg/kg/min）。超越了肝脏代谢极限，极易导致高血糖并诱发渗透性利尿，甚至会导致大量葡萄糖转化为脂肪加重肝脏衰竭风险。'; if(res < 4) return '糖速过低（' + res + '）。完全无法满足新生儿（尤其是早产儿）大脑高速运转的基础能量代谢需求，存在不可逆性低血糖脑损伤的高风险。'; return '当前糖速设置合理。但在全静脉营养加量期，仍需每日监测微量血糖及尿糖。'; }",
    "category": "儿科学",
    "适用人群": "禁食依赖静脉营养的新生儿及早产儿",
    "临床场景": "NICU精细营养调配"
  },
  {
    "id": "pyms_official_tree",
    "title": "儿科 Yorkhill 营养不良筛查 (PYMS) - 标准版",
    "输出": "风险分级及临床行动指南",
    "输入": [
      {
        "name": "bmi_step",
        "label": "步骤 1：BMI 评估 (基于年龄性别百分位)",
        "type": "select",
        "options": [
          "BMI > 第 25 百分位 (0分)",
          "BMI 在第 5 至第 25 百分位之间 (1分)",
          "BMI < 第 5 百分位 (2分)"
        ]
      },
      {
        "name": "weight_loss",
        "label": "步骤 2：非意愿性体重下降",
        "type": "select",
        "options": [
          "无体重下降 (0分)",
          "近期有下降 (或婴幼儿增长停滞) (1分)"
        ]
      },
      {
        "name": "intake",
        "label": "步骤 3：营养摄入评估 (过去/未来一周)",
        "type": "select",
        "options": [
          "摄入正常且预计未来无影响 (0分)",
          "仅过去一周减少 OR 仅预计未来一周减少 (1分)",
          "过去及未来一周均减少/无法进食 (2分)"
        ]
      },
      {
        "name": "illness",
        "label": "步骤 4：疾病对营养的影响",
        "type": "select",
        "options": [
          "无显著影响 (0分)",
          "疾病会对营养状态产生影响 (1分)",
          "疾病会严重影响营养状态 (2分)"
        ]
      }
    ],
    "计算结果": "function(v){ var s = 0; s += parseInt(v.bmi_step.match(/\\d/)[0]); s += parseInt(v.weight_loss.match(/\\d/)[0]); s += parseInt(v.intake.match(/\\d/)[0]); s += parseInt(v.illness.match(/\\d/)[0]); if(s >= 2) return s + ' 分 (高风险：立即干预)'; if(s === 1) return s + ' 分 (中风险：观察与记录)'; return s + ' 分 (低风险：重复筛查)'; }",
    "计算公式": "PYMS (BMI + 体重丢失 + 进食评估 + 疾病影响) 累加逻辑",
    "公式解读": "决策逻辑：1. 总分 0 分为低风险；2. 总分 1 分为中风险；3. 总分 ≥ 2 分为高风险。该量表特别强调了 BMI 低于 P5 和过去/未来连续进食受阻的极高权重。",
    "参考范围": "适用于 1-16 岁住院儿童",
    "健康建议": "function(res, v){ if(res.includes('高风险')){ return '【决策：立即干预】立即联系专职营养师进行详细评估，并制定营养支持计划（如 ONS 或管饲）。'; } if(res.includes('中风险')){ return '【决策：观察记录】记录 3 天出入量；若入量不足，联系营养师协助；一周内必须重复筛查。'; } return '【决策：常规护理】无需特殊干预。每周重复筛查一次。若病情突变随时复测。'; }",
    "category": "儿科学",
    "适用人群": "1 - 16 岁住院患儿",
    "临床建议": "入院 24 小时内初步筛查"
  },
  {
    "id": "strongkids_tree",
    "title": "STRONGkids 住院儿童营养风险筛查",
    "输出": "营养风险分级及干预路径",
    "输入": [
      {
        "name": "subjective",
        "label": "主观临床评估 (如面色苍白/消瘦/皮下脂肪减少)",
        "type": "select",
        "options": [
          "正常 (0分)",
          "存在明显营养不良迹象 (1分)"
        ]
      },
      {
        "name": "high_risk_disease",
        "label": "是否存在高风险疾病 (如：恶性肿瘤/大手术/克罗恩病/早产/肝肾衰竭等)",
        "type": "select",
        "options": [
          "无 (0分)",
          "有 (2分)"
        ]
      },
      {
        "name": "nutritional_intake",
        "label": "营养摄入与丢失 (呕吐/腹泻/摄入减少/吞咽困难)",
        "type": "select",
        "options": [
          "正常 (0分)",
          "存在摄入减少或丢失过多 (1分)"
        ]
      },
      {
        "name": "weight_loss",
        "label": "体重状况 (体重下降或体重不增)",
        "type": "select",
        "options": [
          "体重增长符合预期 (0分)",
          "近期体重下降或婴儿增长停滞 (1分)"
        ]
      }
    ],
    "计算结果": "function(v){ var s = 0; s += parseInt(v.subjective.match(/\\d/)[0]); s += parseInt(v.high_risk_disease.match(/\\d/)[0]); s += parseInt(v.nutritional_intake.match(/\\d/)[0]); s += parseInt(v.weight_loss.match(/\\d/)[0]); if(s >= 4) return s + ' 分 (高风险)'; if(s >= 1) return s + ' 分 (中风险)'; return s + ' 分 (低风险)'; }",
    "计算公式": "STRONGkids (主观评估+高危疾病+摄入+体重) 累加评分",
    "公式解读": "决策逻辑：1. 高危疾病直接占 2 分；2. 总分 4-5 分为高风险，需强制启动营养干预；3. 1-3 分为中风险，需医生复核并监测。",
    "参考范围": "适用于 1 个月 - 18 岁住院患儿",
    "健康建议": "function(res, v){ if(res.includes('高风险')){ return '【高风险决策】1. 立即咨询营养师或儿科营养专家；2. 开始积极营养支持（口服营养补充或肠内营养）；3. 每日监测体重并记录摄入量。'; } if(res.includes('中风险')){ return '【中风险决策】1. 临床医生需详细评估患儿营养状况；2. 保证每日基础热卡供应；3. 每 3 天复查一次评分，若分值上升则升级干预。'; } return '【低风险决策】无需特殊营养干预。建议每周复查一次评分。'; }",
    "category": "儿科学",
    "适用人群": "住院患儿 (除外新生儿病房)",
    "临床场景": "入院 24 小时内常规筛查"
  },
  {
    "id": "schofield",
    "title": "静息能量消耗 (Schofield 公式)",
    "输出": "基础能量需求 (kcal/d)",
    "输入": [
      {
        "name": "age",
        "label": "年龄(岁)",
        "type": "number",
        "placeholder": "8"
      },
      {
        "name": "wt",
        "label": "体重(kg)",
        "type": "number",
        "placeholder": "25"
      },
      {
        "name": "gen",
        "label": "性别",
        "type": "select",
        "options": [
          "男",
          "女"
        ]
      }
    ],
    "计算结果": "function(v){var w=v.wt; return v.age<3?(v.gen==='男'?Math.round(59.5*w-30):Math.round(58.3*w-31)):v.age<=10?(v.gen==='男'?Math.round(22.7*w+504):Math.round(20.3*w+486)):(v.gen==='男'?Math.round(17.7*w+658):Math.round(13.4*w+692));}",
    "计算公式": "依据年龄与性别分层的体重线性回归",
    "公式解读": "世界卫生组织(WHO)权威推荐的儿童基础代谢耗能计算金标准。",
    "参考范围": "仅代表绝对静息状态下的最低生存需求",
    "健康建议": "function(res, v){ return '计算得出患儿基础静息能量消耗(REE)约为 ' + res + ' kcal/d。这仅仅是维持生命体征的最低底线。在实际开具全静脉营养(TPN)或高卡饮食处方时，必须将此数值乘以患儿的【活动系数】（如卧床为1.2）以及【疾病应激系数】（如严重烧伤可高达2.0），才能得出最终的目标总热量。'; }",
    "category": "儿科学",
    "适用人群": "需要精准营养配给的儿童",
    "临床场景": "静脉营养配置中心/营养门诊"
  },
  {
    "id": "pn_energy_phase_tree",
    "title": "不同疾病阶段肠外营养 (PN) 能量调配决策树",
    "输出": "阶段化能量目标及营养策略",
    "输入": [
      {
        "name": "phase",
        "label": "疾病所处阶段",
        "type": "select",
        "options": [
          "超急性期 (早期不稳定期 1-2天)",
          "急性期 (稳定期 3-7天)",
          "恢复期/康复期 (>7天)",
          "慢性消耗期 (长期)"
        ]
      },
      {
        "name": "stress_level",
        "label": "应激程度 (如严重感染、创伤、大手术)",
        "type": "select",
        "options": [
          "轻度应激",
          "中重度应激"
        ]
      },
      {
        "name": "refeeding_risk",
        "label": "是否存在再喂养综合征风险 (极度消瘦/长期禁食)",
        "type": "checkbox"
      }
    ],
    "计算结果": "function(v){ if(v.phase.includes('超急性期')) return '初始阶段：允许性低热卡 (Permissive Underfeeding)'; if(v.phase.includes('急性期')) return '进展阶段：逐步达标热卡'; if(v.phase.includes('恢复期')) return '足量阶段：全额能量目标'; return '维持阶段：代谢平衡目标'; }",
    "计算公式": "基于 ESPEN 2023 重症与外科营养指南分期调配逻辑",
    "公式解读": "决策逻辑：1. 早期(1-2天)不宜给足热卡，以防代谢紊乱；2. 3天后逐步增加至目标的 70%-100%；3. 恢复期需补足机体亏欠，热卡可适当上浮。",
    "参考范围": "成人一般目标为 20-30 kcal/kg/d，小儿需按年龄段调整",
    "健康建议": "function(res, v){ if(v.refeeding_risk) return '【极高危警示】检测到再喂养风险！初始热卡需限制在 10-15 kcal/kg/d，必须先补钾、镁、磷及维生素 B1，严防电解质崩溃。'; if(res.includes('允许性低热卡')){ return '策略：热卡控制在 15-20 kcal/kg/d (或目标的 70%)。重点是维持血糖稳定 (8-10 mmol/L) 和电解质平衡，此阶段不追求正氮平衡。'; } if(res.includes('逐步达标')){ return '策略：热卡上调至 20-25 kcal/kg/d。开始增加蛋白质比例 (1.2-1.5g/kg/d)，监测肝功能及甘油三酯水平。'; } return '策略：目标热卡 25-30 kcal/kg/d。若患者已开始恢复活动，可适当增加非蛋白质热卡，促进肌肉合成。'; }",
    "category": "儿科学",
    "适用人群": "需全肠外或部分肠外营养支持的患者",
    "临床场景": "ICU、普外科术后、肠功能衰竭"
  },
  {
    "id": "fehco3",
    "title": "碳酸氢根排泄分数 (FE HCO3-)",
    "输出": "排泄比例 (%)",
    "输入": [
      {
        "name": "uhco3",
        "label": "尿液碳酸氢根",
        "type": "number",
        "placeholder": "40"
      },
      {
        "name": "phco3",
        "label": "血清碳酸氢根",
        "type": "number",
        "placeholder": "15"
      },
      {
        "name": "ucr",
        "label": "尿液肌酐",
        "type": "number",
        "placeholder": "8000"
      },
      {
        "name": "pcr",
        "label": "血清肌酐",
        "type": "number",
        "placeholder": "90"
      }
    ],
    "计算结果": "function(v){return Math.round((v.uhco3 * v.pcr) / (v.phco3 * v.ucr) * 100 * 10)/10;}",
    "计算公式": "(尿HCO3 / 血HCO3) ÷ (尿Cr / 血Cr) × 100%",
    "公式解读": "判定肾脏近端小管是否丧失了对碱性物质（碳酸氢根）重吸收能力的定性指标。",
    "参考范围": "静脉滴注碳酸氢钠负荷后 >15% 提示阳性",
    "健康建议": "function(res, v){ if(res > 15) return '排泄分数>15%，确立了近端肾小管碳酸氢根重吸收严重障碍的诊断，即【 II型肾小管酸中毒 (RTA)】。患儿大量碱基从尿液丢失，常合并严重的低钾血症和全身生长发育迟缓。必须终生维持大剂量的碱剂（如枸橼酸钾混合液）口服补充。'; return '指标正常，可基本排除单纯由近端肾小管生理缺陷引发的失碱性代谢性酸中毒。'; }",
    "category": "儿科学",
    "适用人群": "不明原因代谢性酸中毒及发育迟缓患儿",
    "临床场景": "小儿肾内科/内分泌科疑难排查"
  },
  {
    "id": "dili_severity_tree",
    "title": "药物性肝损伤 (DILI) 严重度分级评估",
    "输出": "DILI 严重度等级及临床路径",
    "输入": [
      {
        "name": "alt",
        "label": "ALT/AST 升高倍数 (较正常上限 ULN)",
        "type": "select",
        "options": [
          "< 2倍 (正常/轻微)",
          "2 - 5 倍",
          "5 - 10 倍",
          "> 10 倍"
        ]
      },
      {
        "name": "tbil",
        "label": "总胆红素 (TBil) 水平",
        "type": "select",
        "options": [
          "< 2.0 mg/dL (34.2 μmol/L)",
          ">= 2.0 mg/dL (出现黄疸)"
        ]
      },
      {
        "name": "inr",
        "label": "凝血功能 (INR)",
        "type": "select",
        "options": [
          "正常 (< 1.5)",
          "异常 (>= 1.5)"
        ]
      },
      {
        "name": "hosp",
        "label": "是否需要住院或已住院治疗",
        "type": "checkbox"
      },
      {
        "name": "organ_fail",
        "label": "是否存在器官衰竭 (脑病/腹水/肾衰)",
        "type": "checkbox"
      }
    ],
    "计算结果": "function(v){ if(v.organ_fail) return '5 级 (致命性：肝衰竭/多脏器衰竭)'; if(v.inr === '异常 (>= 1.5)' && v.tbil.includes('>= 2.0')) return '4 级 (重度：急性肝损伤伴凝血障碍)'; if(v.hosp || v.tbil.includes('>= 2.0')) return '3 级 (中度：需住院治疗或伴有黄疸)'; if(v.alt.includes('> 10 倍') || v.alt.includes('5 - 10 倍')) return '2 级 (轻-中度：显著生化异常)'; return '1 级 (轻度：血清学异常但无临床症状)'; }",
    "计算公式": "基于国际 DILI 专家组 (iDILIN) 严重度 5 级分类法",
    "公式解读": "决策逻辑：1. 核心红线：INR ≥ 1.5 (判定 4 级)；2. 关键体征：TBil ≥ 2.0 (判定 3 级及以上)；3. 预后警示：出现器官衰竭即为 5 级。",
    "参考范围": "需先通过 RUCAM 评分确认药物与肝损的因果关系",
    "健康建议": "function(res, v){ if(res.includes('5 级') || res.includes('4 级')){ return '【极高危决策】1. 立即停用所有可疑药物；2. 收入重症监护或肝病专科；3. 评估人工肝支持或肝移植指征；4. 监测脑电图防止肝性脑病。'; } if(res.includes('3 级')){ return '【住院决策】1. 停用可疑药物；2. 住院观察，每日监测肝功能；3. 给予保肝及利胆治疗，预防病情向 4 级演变。'; } return '【门诊决策】1. 立即停用可疑药物；2. 每周复查肝功能 1-2 次，直至指标下降 > 50%。若指标持续上升，需立即住院。'; }",
    "category": "儿科学",
    "适用人群": "怀疑药物导致肝损伤的患儿及成人",
    "临床建议": "药源性疾病筛查与风险分流"
  },
  {
    "id": "ped_anemia_tree",
    "title": "儿童贫血严重程度分级评估",
    "输出": "贫血等级及治疗决策",
    "输入": [
      {
        "name": "age_group",
        "label": "患儿年龄段",
        "type": "select",
        "options": [
          "新生儿 (出生-28天)",
          "6个月 - 6岁",
          "6岁 - 14岁"
        ]
      },
      {
        "name": "hb_val",
        "label": "血红蛋白测定值 (Hb, g/L)",
        "type": "number",
        "placeholder": "100"
      },
      {
        "name": "symptoms",
        "label": "伴随症状 (如：面色极苍白/心率快/活动后气促)",
        "type": "checkbox"
      }
    ],
    "计算结果": "function(v){ var hb = v.hb_val; var limit = 110; if(v.age_group.includes('新生儿')) limit = 145; if(v.age_group.includes('14岁')) limit = 120; if(hb >= limit) return '未达贫血诊断标准'; if(hb >= 90) return '轻度贫血'; if(hb >= 60) return '中度贫血'; if(hb >= 30) return '重度贫血'; return '极重度贫血'; }",
    "计算公式": "基于不同年龄段 Hb 阈值及四级分法 (轻/中/重/极重)",
    "公式解读": "决策逻辑：1. 诊断红线：新生儿 <145, 6岁以下 <110, 6岁以上 <120。2. 分级红线：<90(轻), <60(中), <30(极重)。当 Hb <60g/L 时，决策树指向住院或输血评估。",
    "参考范围": "不同年龄段 Hb 正常参考值存在显著差异",
    "健康建议": "function(res, v){ if(res.includes('极重度') || res.includes('重度')){ return '【紧急医疗决策】患儿处于失代偿风险！1. 建议立即住院；2. 评估是否需要紧急输注浓缩红细胞；3. 严格限制活动，吸氧，预防心力衰竭。'; } if(res.includes('中度')){ return '【临床干预建议】建议完善网织红细胞、铁代谢及骨髓检查明确病因。启动口服铁剂（或其他针对性药物）治疗，1-2周后复查 Hb 观察反应。'; } if(res.includes('轻度')){ return '【饮食及药物建议】多摄入红肉、猪肝等富铁食物。建议口服预防量铁剂，1个月后随访。'; } return '目前 Hb 数值在正常范围。请保持均衡饮食，定期体检监测。'; }",
    "category": "儿科学",
    "适用人群": "0-14 岁儿童及青少年",
    "临床场景": "血常规报告解读/贫血分诊"
  },
  {
    "id": "growth_dev_tree",
    "title": "0-18 岁儿童生长标准与偏离评估 (中国标准)",
    "输出": "生长发育评价结果",
    "输入": [
      {
        "name": "age_group",
        "label": "患儿年龄段",
        "type": "select",
        "options": [
          "< 2 岁",
          "2 - 5 岁",
          "5 - 18 岁"
        ]
      },
      {
        "name": "height_p",
        "label": "当前身高/身长处于同性别/年龄百分位 (P)",
        "type": "select",
        "options": [
          "< P3 (矮小)",
          "P3 - P10 (偏矮)",
          "P10 - P90 (正常)",
          "> P97 (超高)"
        ]
      },
      {
        "name": "weight_p",
        "label": "当前体重处于同性别/年龄百分位 (P)",
        "type": "select",
        "options": [
          "< P3 (体重过低)",
          "P3 - P90 (正常)",
          "P90 - P97 (超重)",
          "> P97 (肥胖)"
        ]
      },
      {
        "name": "velocity",
        "label": "近 6-12 个月生长速度 (cm/年)",
        "type": "select",
        "options": [
          "正常范围 (> 5cm/年)",
          "缓慢 (< 5cm/年)",
          "生长停滞"
        ]
      }
    ],
    "计算结果": "function(v){ if(v.height_p === '< P3 (矮小)') return '确诊：矮小症 (Short Stature)'; if(v.height_p === 'P3 - P10 (偏矮)' && v.velocity === '缓慢 (< 5cm/年)') return '生长迟缓预警：需排查病理原因'; if(v.weight_p === '> P97 (肥胖)') return '诊断：肥胖症'; return '评价：生长发育处于正常范围'; }",
    "计算公式": "依据 WS/T 423-2022 及 WS/T 586-2018 中国儿童生长标准",
    "公式解读": "决策逻辑：1. 矮小症：身高低于同性别年龄第 3 百分位。2. 肥胖：BMI 或体重超过 P97。3. 速度：若水平正常但速度跌破 5cm/年，属于高风险偏离。",
    "参考范围": "P3-P97 为正常范围；P50 为平均水平",
    "健康建议": "function(res, v){ if(res.includes('矮小')){ return '【决策建议】立即启动矮小症筛查：1. 骨龄检查(X线)；2. 甲状腺功能及生长激素激发试验；3. 排除消化吸收障碍或全身慢性病。'; } if(res.includes('预警')){ return '【监测建议】患儿目前身高处于临界点且生长速度减慢。建议改善睡眠(22点前入睡)、增加纵向运动，3个月后复测。若持续不长，需内分泌科就诊。'; } if(res.includes('肥胖')){ return '【干预建议】1. 限制高热量食物摄入；2. 每日中等强度运动 1 小时以上；3. 监测血糖、血脂，防范儿童非酒精性脂肪肝。'; } return '生长发育良好。建议继续保持均衡膳食，每年定期进行健康体检并记录生长曲线。'; }",
    "category": "儿科学",
    "适用人群": "0-18 岁中国儿童及青少年",
    "临床场景": "儿保门诊/生长发育专项评估"
  },
  {
    "id": "stamp_tree",
    "title": "儿童营养不良评估筛查量ate (STAMP)",
    "输出": "营养风险等级及干预建议",
    "输入": [
      {
        "name": "diagnosis",
        "label": "步骤 1：疾病诊断与营养关系",
        "type": "select",
        "options": [
          "疾病与营养无关 (0分)",
          "可能影响营养摄入/增加需求 (1分)",
          "必然导致营养不良 (如：肠衰竭/大手术/恶性肿瘤) (3分)"
        ]
      },
      {
        "name": "intake",
        "label": "步骤 2：膳食摄入情况",
        "type": "select",
        "options": [
          "摄入正常/充足 (0分)",
          "近期摄入减少或减半 (1分)",
          "基本无摄入/极少量摄入 (2分)"
        ]
      },
      {
        "name": "growth",
        "label": "步骤 3：生长发育情况 (参考生长曲线)",
        "type": "select",
        "options": [
          "身高/体重百分位正常 (0分)",
          "身高/体重下降 1 条百分位线 (1分)",
          "身高/体重下降 2 条及以上百分位线 (3分)"
        ]
      }
    ],
    "计算结果": "function(v){ var s = 0; s += parseInt(v.diagnosis.match(/\\d/)[0]); s += parseInt(v.intake.match(/\\d/)[0]); s += parseInt(v.growth.match(/\\d/)[0]); if(s >= 4) return s + ' 分 (高风险：需立即干预)'; if(s >= 2) return s + ' 分 (中风险：需监测及转介)'; return s + ' 分 (低风险：常规护理)'; }",
    "计算公式": "STAMP (步骤1+步骤2+步骤3) 累加评分逻辑",
    "公式解读": "决策逻辑：STAMP 通过 0-9 分量化营养风险。4 分是启动临床营养支持(NST)的红线。它强调了原发疾病对营养的影响，而不只是看当前的体重。",
    "参考范围": "适用于 2-17 岁住院儿童",
    "健康建议": "function(res, v){ if(res.includes('高风险')){ return '【高风险决策】立即启动以下流程：1. 转诊给临床营养师进行全面评估；2. 制定个性化营养支持方案(口服补充/管饲/静脉)；3. 每日记录出入量并监测体重。'; } if(res.includes('中风险')){ return '【中风险监测】建议：1. 密切观察膳食摄入 3 天；2. 若 3 天后情况未改善，升级为高风险处理；3. 每周复查一次 STAMP 评分。'; } return '【低风险】继续常规临床护理。每隔 7 天或在病情发生显著变化时重新进行 STAMP 筛查。'; }",
    "category": "儿科学",
    "适用人群": "住院儿童 (2-17岁)",
    "临床场景": "入院 24 小时内营养筛查"
  },
  {
    "id": "pelod2_tree",
    "title": "儿童器官功能障碍评分 (PELOD-2)",
    "输出": "器官障碍程度及预测病死率",
    "输入": [
      {
        "name": "neuro",
        "label": "神经系统 (GCS 评分及瞳孔反应)",
        "type": "select",
        "options": [
          "GCS 12-15 且 瞳孔有反应 (0分)",
          "GCS 5-11 且 瞳孔有反应 (1分)",
          "GCS 3-4 或 瞳孔无反应 (4分)"
        ]
      },
      {
        "name": "cv_lac",
        "label": "心血管系统：血乳酸 (mmol/L)",
        "type": "select",
        "options": [
          "< 2.0 (0分)",
          "2.0 - 4.9 (1分)",
          "5.0 - 10.9 (3分)",
          ">= 11.0 (4分)"
        ]
      },
      {
        "name": "cv_map",
        "label": "心血管系统：平均动脉压 (MAP, mmHg) - 需结合年龄",
        "type": "select",
        "options": [
          "正常范围 (0分)",
          "低于年龄段阈值 (2分)"
        ]
      },
      {
        "name": "renal_scr",
        "label": "肾脏系统：血肌酐 (μmol/L) - 需结合年龄",
        "type": "select",
        "options": [
          "正常范围 (0分)",
          "达到 1 分阈值 (1分)",
          "达到 2 分阈值 (2分)"
        ]
      },
      {
        "name": "resp_pf",
        "label": "呼吸系统：PaO2/FiO2 (P/F 比值)",
        "type": "select",
        "options": [
          "> 60 (0分)",
          "入院判定或 P/F 10-60 (1分)",
          "P/F < 10 (2分)"
        ]
      },
      {
        "name": "resp_pco2",
        "label": "呼吸系统：PaCO2 (mmHg)",
        "type": "select",
        "options": [
          "<= 95 (0分)",
          "> 95 (1分)"
        ]
      },
      {
        "name": "resp_vent",
        "label": "是否需要机械通气支持",
        "type": "select",
        "options": [
          "否 (0分)",
          "是 (1分)"
        ]
      },
      {
        "name": "heme_wbc",
        "label": "血液系统：白细胞计数 (10⁹/L)",
        "type": "select",
        "options": [
          "> 4.5 (0分)",
          "1.5 - 4.5 (1分)",
          "< 1.5 (2分)"
        ]
      },
      {
        "name": "heme_plt",
        "label": "血液系统：血小板计数 (10⁹/L)",
        "type": "select",
        "options": [
          ">= 142 (0分)",
          "77 - 141 (1分)",
          "< 77 (2分)"
        ]
      }
    ],
    "计算结果": "function(v){ var s = 0; s += parseInt(v.neuro.match(/\\d/)[0]); s += parseInt(v.cv_lac.match(/\\d/)[0]); s += v.cv_map.includes('2分')?2:0; s += parseInt(v.renal_scr.match(/\\d/)[0]); s += parseInt(v.resp_pf.match(/\\d/)[0]); s += v.resp_pco2.includes('1分')?1:0; s += v.resp_vent.includes('1分')?1:0; s += parseInt(v.heme_wbc.match(/\\d/)[0]); s += parseInt(v.heme_plt.match(/\\d/)[0]); if(s >= 12) return s + ' 分 (极高危：预测病死率 > 50%)'; if(s >= 7) return s + ' 分 (高危：严重器官功能障碍)'; return s + ' 分 (中低危：需持续动态评估)'; }",
    "计算公式": "PELOD-2 (Pediatric Logistic Organ Dysfunction-2)",
    "公式解读": "决策逻辑：PELOD-2 是 PICU 最严谨的评分，满分 33 分。它通过对神经、心血管、肾脏、呼吸、血液五个系统的变量加权累加，精准量化多器官功能障碍的严重程度。",
    "参考范围": "评分越高，患儿存活机率越低",
    "健康建议": "function(res, v){ if(res.includes('极高危')){ return '【紧急红色预警】PELOD-2 评分显示器官衰竭已达终末期风险。决策建议：1. 立即由多学科专家组(MDT)接管；2. 启动最高级别器官支持（如 ECMO 评估、肾脏替代 CRRT）；3. 向家属告知极高病死风险。'; } if(res.includes('高危')){ return '【高危状态】提示存在两个及以上系统的严重障碍。建议：强化器官保护策略，避免医源性二次损伤（如限制性输液、肺保护性通气），并寻找可逆转的病因。'; } return '【监护状态】目前器官功能尚在代偿期。建议每日固定时间（通常为清晨）复评一次，观察评分趋势演变。'; }",
    "category": "儿科学",
    "适用人群": "PICU 住院患儿",
    "临床场景": "重症监护/器官功能障碍定量评价"
  },
  {
    "id": "pcis_tree",
    "title": "儿童危重病例客观评分 (PCIS)",
    "输出": "病情分度及预后评估",
    "输入": [
      {
        "name": "hr",
        "label": "心率/血压 (符合该年龄段标准)",
        "type": "select",
        "options": [
          "正常 (10分)",
          "增快/减慢 或 血压下降 (6分)",
          "显著异常/严重低血压 (4分)"
        ]
      },
      {
        "name": "resp",
        "label": "呼吸频率 (符合该年龄段标准)",
        "type": "select",
        "options": [
          "正常 (10分)",
          "增快/减慢 (6分)",
          "显著异常/呼吸停止/需机械通气 (4分)"
        ]
      },
      {
        "name": "paO2",
        "label": "动脉血氧分压 (PaO2) / 氧合情况",
        "type": "select",
        "options": [
          "> 60 mmHg (10分)",
          "40 - 60 mmHg (6分)",
          "< 40 mmHg (4分)"
        ]
      },
      {
        "name": "ph",
        "label": "动脉血 pH 值",
        "type": "select",
        "options": [
          "7.35 - 7.45 (10分)",
          "7.25 - 7.34 或 7.46 - 7.50 (6分)",
          "< 7.25 或 > 7.50 (4分)"
        ]
      },
      {
        "name": "na",
        "label": "血钠 (Na+)",
        "type": "select",
        "options": [
          "130 - 150 mmol/L (10分)",
          "120 - 129 或 151 - 160 (6分)",
          "< 120 或 > 160 (4分)"
        ]
      },
      {
        "name": "k",
        "label": "血钾 (K+)",
        "type": "select",
        "options": [
          "3.0 - 5.5 mmol/L (10分)",
          "2.5 - 2.9 或 5.6 - 6.5 (6分)",
          "< 2.5 或 > 6.5 (4分)"
        ]
      },
      {
        "name": "bun_scr",
        "label": "肾功能 (BUN 或 SCr)",
        "type": "select",
        "options": [
          "正常 (10分)",
          "轻度升高 (6分)",
          "显著升高/少尿/无尿 (4分)"
        ]
      },
      {
        "name": "gi",
        "label": "胃肠系统 (出血/腹胀)",
        "type": "select",
        "options": [
          "正常 (10分)",
          "腹胀/肠鸣音减弱 (6分)",
          "应激性溃疡出血/肠麻痹 (4分)"
        ]
      },
      {
        "name": "hb",
        "label": "血红蛋白 (Hb)",
        "type": "select",
        "options": [
          "> 90 g/L (10分)",
          "60 - 90 g/L (6分)",
          "< 60 g/L (4分)"
        ]
      },
      {
        "name": "be",
        "label": "剩余碱 (BE)",
        "type": "select",
        "options": [
          "-3 到 +3 (10分)",
          "-10 到 -4 或 +4 到 +10 (6分)",
          "< -10 或 > +10 (4分)"
        ]
      }
    ],
    "计算结果": "function(v){ var s = 0; s += parseInt(v.hr.match(/\\d+/)[0]); s += parseInt(v.resp.match(/\\d+/)[0]); s += parseInt(v.paO2.match(/\\d+/)[0]); s += parseInt(v.ph.match(/\\d+/)[0]); s += parseInt(v.na.match(/\\d+/)[0]); s += parseInt(v.k.match(/\\d+/)[0]); s += parseInt(v.bun_scr.match(/\\d+/)[0]); s += parseInt(v.gi.match(/\\d+/)[0]); s += parseInt(v.hb.match(/\\d+/)[0]); s += parseInt(v.be.match(/\\d+/)[0]); if(s <= 70) return s + ' 分 (极危重：病死率极高)'; if(s <= 80) return s + ' 分 (危重：需强化监护)'; return s + ' 分 (非危重：当前病情尚可)'; }",
    "计算公式": "中国儿童危重病例评分 (PCIS) 10项指标递减计分法",
    "公式解读": "决策逻辑：PCIS 满分 100 分。80 分为危重红线，70 分为极危重红线。它能够综合评价内环境、呼吸循环、肝肾及造血系统的受损程度。",
    "参考范围": "得分越低，病情越严重",
    "健康建议": "function(res, v){ if(res.includes('极危重')){ return '【极危重预警】患儿 PCIS 评分 ≤70 分。决策建议：1. 必须收治 PICU 维持生命体征；2. 立即启动多器官功能支持（如机械通气、连续血液净化）；3. 动态监测血气及电解质（每 4-6 小时），严防脏器功能衰竭。'; } if(res.includes('危重')){ return '【危重状态】患儿处于危险期。建议：强化一级护理，密切观察心率、血压、尿量变化。若指标持续恶化（分值下降），应及时调整治疗方案。'; } return '【相对稳定】目前未达危重标准，但仍需积极治疗原发病，防止并发症导致评分下降。'; }",
    "category": "儿科学",
    "适用人群": "住院患儿 (新生儿除外)",
    "临床场景": "病情严重度评估/PICU 入选指征"
  },
  {
    "id": "pews_tree",
    "title": "儿童早期预警评分 (PEWS) 决策系统",
    "输出": "风险分级与临床响应方案",
    "输入": [
      {
        "name": "behavior",
        "label": "行为状态 (意识与反应)",
        "type": "select",
        "options": [
          "状态佳/安静 (0分)",
          "嗜睡/反应迟钝 (1分)",
          "烦躁/持续哭闹 (2分)",
          "对疼痛无反应/萎靡/意识模糊 (3分)"
        ]
      },
      {
        "name": "cv",
        "label": "心血管状态 (肤色与灌注)",
        "type": "select",
        "options": [
          "粉红/毛细血管再充盈(CRT) 1-2s (0分)",
          "苍白/CRT 3s (1分)",
          "灰暗/CRT 4s/心率高于正常上限20次 (2分)",
          "大理石样花纹/CRT >=5s/心动过缓 (3分)"
        ]
      },
      {
        "name": "resp",
        "label": "呼吸状态 (频率与用力)",
        "type": "select",
        "options": [
          "正常/无辅助肌参与 (0分)",
          ">年龄上限10次/分/使用辅助呼吸肌 (1分)",
          ">年龄上限20次/分/明显三凹征 (2分)",
          "低于年龄下限/呻吟/FiO2 >40% (3分)"
        ]
      },
      {
        "name": "nebulizer",
        "label": "是否正在进行持续雾化 (每15分钟/次)",
        "type": "checkbox"
      },
      {
        "name": "vomit",
        "label": "手术后持续呕吐",
        "type": "checkbox"
      }
    ],
    "计算结果": "function(v){ var s = 0; s += parseInt(v.behavior.match(/\\d/)[0]); s += parseInt(v.cv.match(/\\d/)[0]); s += parseInt(v.resp.match(/\\d/)[0]); if(v.nebulizer) s += 2; if(v.vomit) s += 2; if(s >= 5) return s + ' 分 (红色预警：极高危)'; if(s >= 3) return s + ' 分 (黄色预警：中危)'; return s + ' 分 (绿色：低危/稳定)'; }",
    "计算公式": "PEWS (Behavior + CV + Resp) 综合评估矩阵",
    "公式解读": "决策逻辑：1. 核心三要素评分：行为、循环、呼吸各 0-3 分；2. 附加修正：持续雾化或术后呕吐各加 2 分。总分 ≥5 分是启动快速反应团队 (RRT) 的国际标准。",
    "参考范围": "0-2分常规监测；3-4分增加评估频率；≥5分立即抢救",
    "健康建议": "function(res, v){ if(res.includes('红色')){ return '【紧急红色响应】立即启动快速反应团队 (RRT) 或通知二线值班医生！患儿存在猝死风险。立即准备：1. 高流量吸氧；2. 建立可靠静脉通路；3. 转入 PICU 进行强化监护。'; } if(res.includes('黄色')){ return '【黄色加强监测】立即请值班医生床旁评估。增加生命体征监测频次至每 30-60 分钟一次。若 2 小时内评分未下降，需考虑升级响应等级。'; } return '【常规绿色监测】目前生理指标尚稳定。按科室常规分级护理要求，每 4 4-8 小时进行一次 PEWS 评分复核。'; }",
    "category": "儿科学",
    "适用人群": "病房住院患儿 (非 ICU)",
    "临床场景": "病房日常巡视/病情突变早期识别"
  },
  {
    "id": "pmods_tree",
    "title": "儿童多器官功能障碍生化评分 (P-MODS)",
    "输出": "器官障碍程度及预后风险",
    "输入": [
      {
        "name": "resp",
        "label": "呼吸系统 (P/F 氧合指数)",
        "type": "select",
        "options": [
          "> 300 (0分)",
          "226 - 300 (1分)",
          "151 - 225 (2分)",
          "76 - 150 (3分)",
          "< 75 (4分)"
        ]
      },
      {
        "name": "cv",
        "label": "心血管系统 (乳酸 mmol/L)",
        "type": "select",
        "options": [
          "< 1.5 (0分)",
          "1.5 - 2.3 (1分)",
          "2.4 - 4.4 (2分)",
          "4.5 - 10.3 (3分)",
          "> 10.3 (4分)"
        ]
      },
      {
        "name": "liver",
        "label": "肝脏系统 (总胆红素 μmol/L)",
        "type": "select",
        "options": [
          "< 10 (0分)",
          "10 - 18 (1分)",
          "19 - 60 (2分)",
          "61 - 240 (3分)",
          "> 240 (4分)"
        ]
      },
      {
        "name": "renal",
        "label": "肾脏系统 (尿素氮 BUN mmol/L)",
        "type": "select",
        "options": [
          "< 3.0 (0分)",
          "3.0 - 4.5 (1分)",
          "4.6 - 8.8 (2分)",
          "8.9 - 19.5 (3分)",
          "> 19.5 (4分)"
        ]
      },
      {
        "name": "heme",
        "label": "血液系统 (纤维蛋白原 g/L)",
        "type": "select",
        "options": [
          "> 2.0 (0分)",
          "1.5 - 2.0 (1分)",
          "1.0 - 1.4 (2分)",
          "0.5 - 0.9 (3分)",
          "< 0.5 (4分)"
        ]
      }
    ],
    "计算结果": "function(v){ var s = 0; s += parseInt(v.resp.match(/\\d/)[0]); s += parseInt(v.cv.match(/\\d/)[0]); s += parseInt(v.liver.match(/\\d/)[0]); s += parseInt(v.renal.match(/\\d/)[0]); s += parseInt(v.heme.match(/\\d/)[0]); if(s >= 10) return s + ' 分 (极高危：MODS 状态明确)'; if(s >= 5) return s + ' 分 (高危：多器官受累)'; return s + ' 分 (轻中度：单一或少数受累)'; }",
    "计算公式": "P-MODS (Pediatric Multiple Organ Dysfunction Score)",
    "公式解读": "决策逻辑：P-MODS 专注于生化指标的量化，分值越高代表内环境崩坏越严重。它能够更客观地反映多脏器功能衰竭的动态演变，不受镇静药物对神经评分的影响。",
    "参考范围": "总分 0-20 分；分值与 PICU 死亡率呈显著正相关",
    "健康建议": "function(res, v){ if(res.includes('极高危')){ return '警告：' + res + '。患儿已处于全身炎症反应综合征(SIRS)导致的终末期表现。建议：1. 立即强化多器官功能支持（如血液净化、高参数机械通气）；2. 动态监测乳酸趋势以评估组织灌注改善情况。'; } if(res.includes('高危')){ return '提示：器官受损已跨越单一脏器，发生 MODS 风险极高。应启动高级生命支持预案，并警惕 DIC 及急性肾衰竭的发生。'; } return '目前状态：' + res + '。建议继续原发病治疗，并每日复查核心生化指标。'; }",
    "category": "儿科学",
    "适用人群": "PICU 重症患儿",
    "临床场景": "多脏器衰竭定量评价"
  },
  {
    "id": "psofa_tree",
    "title": "儿童序贯器官衰竭评分 (pSOFA)",
    "输出": "器官衰竭严重度及病死风险",
    "输入": [
      {
        "name": "age_group",
        "label": "年龄组别",
        "type": "select",
        "options": [
          "< 1 个月",
          "1 - 11 个月",
          "1 - 12 岁",
          "13 - 18 岁"
        ]
      },
      {
        "name": "resp",
        "label": "呼吸系统 (P/F 比值 或 SpO2/FiO2)",
        "type": "select",
        "options": [
          "正常 (0分)",
          "P/F < 400 或 S/F < 292 (1分)",
          "P/F < 300 或 S/F < 264 (2分)",
          "有创通气且 P/F < 200 或 S/F < 221 (3分)",
          "有创通气且 P/F < 100 或 S/F < 148 (4分)"
        ]
      },
      {
        "name": "coag",
        "label": "凝血系统 (血小板计数 10³/μL)",
        "type": "select",
        "options": [
          ">= 150 (0分)",
          "100 - 149 (1分)",
          "50 - 99 (2分)",
          "20 - 49 (3分)",
          "< 20 (4分)"
        ]
      },
      {
        "name": "liver",
        "label": "肝脏系统 (总胆红素 mg/dL)",
        "type": "select",
        "options": [
          "< 1.2 (0分)",
          "1.2 - 1.9 (1分)",
          "2.0 - 5.9 (2分)",
          "6.0 - 11.9 (3分)",
          ">= 12.0 (4分)"
        ]
      },
      {
        "name": "cv",
        "label": "心血管系统 (平均动脉压 MAP 或 血管活性药)",
        "type": "select",
        "options": [
          "MAP 正常 (0分)",
          "MAP 低于年龄阈值 (1分)",
          "多巴胺<=5 或 任意剂量多巴酚丁胺 (2分)",
          "多巴胺>5 或 肾上腺素<=0.1 或 去甲<=0.1 (3分)",
          "多巴胺>15 或 肾上腺素>0.1 或 去甲>0.1 (4分)"
        ]
      },
      {
        "name": "gcs",
        "label": "神经系统 (改良 GCS 评分)",
        "type": "select",
        "options": [
          "15分 (0分)",
          "13 - 14 分 (1分)",
          "10 - 12 分 (2分)",
          "6 - 9 分 (3分)",
          "< 6 分 (4分)"
        ]
      },
      {
        "name": "renal",
        "label": "肾脏系统 (血肌酐 μmol/L - 需结合年龄判定)",
        "type": "select",
        "options": [
          "正常 (0分)",
          "达到 1 分阈值 (1分)",
          "达到 2 分阈值 (2分)",
          "达到 3 分阈值 (3分)",
          "达到 4 分阈值 (4分)"
        ]
      }
    ],
    "计算结果": "function(v){ var s = 0; s += parseInt(v.resp.match(/\\d/)[0]); s += parseInt(v.coag.match(/\\d/)[0]); s += parseInt(v.liver.match(/\\d/)[0]); s += parseInt(v.cv.match(/\\d/)[0]); s += parseInt(v.gcs.match(/\\d/)[0]); s += parseInt(v.renal.match(/\\d/)[0]); if(s >= 15) return s + ' 分 (极高危：病死率 > 50%)'; if(s >= 10) return s + ' 分 (高危：病死率约 15-30%)'; return s + ' 分 (中低危)'; }",
    "计算公式": "Pediatric Sequential Organ Failure Assessment (pSOFA)",
    "公式解读": "决策逻辑：pSOFA 专门针对儿童生理指标进行了基准线调整（尤其是肌酐和心血管 MAP）。总分越高，代表器官功能受损越严重，预示病死率越高。",
    "参考范围": "得分每增加 1 分，病死风险显著增加",
    "健康建议": "function(res, v){ if(res.includes('极高危')) return '警告：患儿处于多脏器功能衰竭极危重状态。建议立即启动多学科会诊(MDT)，强化生命支持（如血液净化、高级通气），并与家属充分沟通预后情况。'; if(res.includes('高危')) return '提示：器官受累严重，需转入或保留在 PICU。应密切关注乳酸清除率，并尝试寻找并解除导致脏器损伤的原发诱因。'; return '目前器官状态尚在可控范围，但需每 12-24 小时复评，警惕评分的动态升高。'; }",
    "category": "儿科学",
    "适用人群": "PICU 住院患儿",
    "临床场景": "脓毒症及重症预后评估"
  },
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
  {
    "id": "k_supp",
    "title": "补钾公式",
    "输出": "缺钾量(mmol)",
    "输入": [
      {
        "name": "k_real",
        "label": "实测血钾",
        "type": "number",
        "unit": "mmol/L",
        "placeholder": "3.0"
      },
      {
        "name": "wt",
        "label": "体重",
        "type": "number",
        "unit": "kg",
        "placeholder": "60"
      }
    ],
    "计算结果": "function(v){return Math.round((4.5-v.k_real)*v.wt*0.4*10)/10;}",
    "计算公式": "(4.5-实测钾)×体重×0.4",
    "公式解读": "计算达到目标血钾所需补充的钾总量。",
    "参考范围": "3.5-5.5mmol/L",
    "健康建议": "function(res, v){ if(res > 100) return '缺钾量较大(' + res + 'mmol)。静脉滴注浓度严禁超过40mmol/L，速度不宜超过20mmol/h，需心电监护。'; return '建议首选口服补钾。若静脉补钾需严格遵循见尿补钾原则。'; }",
    "category": "肾脏病学",
    "适用人群": "低钾血症患者",
    "临床场景": "低钾纠正"
  },
  {
    "id": "bvas_v3_clinical_standard",
    "title": "伯明翰血管炎活动度评分 (BVAS) v3.0",
    "version": "3.1",
    "输出": "BVAS 活动度总分及治疗强度建议",
    "输入": [
      {
        "name": "systemic",
        "label": "1. 全身症状 (取最高分项，上限 3 分)",
        "type": "radio",
        "options": [
          "无 (0分)",
          "乏力/关节痛/肌痛 (1分)",
          "发热≥38.0°C (2分)",
          "体重减轻≥2kg (2分)"
        ]
      },
      {
        "name": "renal_status",
        "label": "2. 肾脏受累症状 (可多选逻辑，上限 12 分)",
        "type": "radio",
        "options": [
          "无受累 (0分)",
          "高血压 (>140/90) 或 蛋白尿 (>1+) (4分)",
          "血尿 (≥10 RBC/hpf) (6分)",
          "肌酐上升 (250-499 umol/L) (10分)",
          "肌酐≥500 umol/L 或 急性急剧上升 (12分)"
        ]
      },
      {
        "name": "lung_status",
        "label": "3. 肺部受累 (关键预后项，上限 6 分)",
        "type": "radio",
        "options": [
          "无 (0分)",
          "喘鸣/结节/空洞 (3分)",
          "肺泡出血/呼吸衰竭 (6分)"
        ]
      },
      {
        "name": "other_organs",
        "label": "4. 其他系统 (皮肤/眼/鼻/耳/神经等)",
        "type": "radio",
        "options": [
          "无 (0分)",
          "轻度受累 (如紫癜、鼻炎) (3分)",
          "重度受累 (如巩膜炎、单神经炎) (6分)"
        ]
      }
    ],
    "计算结果": "function(v){ var s1 = v.systemic.includes('1分')?1:(v.systemic.includes('2分')?2:0); var s2 = v.renal_status.includes('4分')?4:(v.renal_status.includes('6分')?6:(v.renal_status.includes('10分')?10:(v.renal_status.includes('12分')?12:0))); var s3 = v.lung_status.includes('3分')?3:(v.lung_status.includes('6分')?6:0); var s4 = v.other_organs.includes('3分')?3:(v.other_organs.includes('6分')?6:0); var total = s1 + s2 + s3 + s4; var activity = total === 0 ? '缓解期' : (total <= 8 ? '轻中度活动' : '重度活动'); return 'BVAS总分: ' + total + ' (' + activity + ')'; }",
    "计算公式": "Σ(各系统得分)，各系统存在封顶分(肾脏12, 全身3, 肺6等)",
    "公式解读": "1. 仅评分由于血管炎导致的“新发”或“加重”症状；2. 慢性陈旧性损伤(如陈旧性硬化)不评分；3. 肾脏受累得分权重最高，直接决定诱导缓解强度。",
    "参考范围": "0分=完全缓解；>0分=疾病活动；≥9分=重度活动",
    "健康建议": "function(res, v){ if(res.includes('重度')){ return '【紧急医疗方案】1. 存在重要脏器(肾/肺)衰竭风险；2. 强烈建议启动大剂量激素冲击(甲泼尼龙500mg/d×3d)；3. 联合CTX或利妥昔单抗诱导缓解；4. 评估血浆置换指征。'; } if(res.includes('轻中度')){ return '【治疗调整】1. 建议规范免疫抑制方案；2. 每2周复查肾功/尿常规；3. 监测ANCA滴度。'; } return '【维持期方案】病情稳定。继续小剂量激素或维持期药物(如硫唑嘌呤)治疗。'; }",
    "category": "肾脏病学",
    "适用人群": "ANCA 相关性血管炎 (AAV) 患者",
    "clinical_scenario": "病情活动度实时评估、诱导缓解方案制定参考"
  },
  {
    "id": "rrf",
    "title": "残余肾功能",
    "输出": "RRF(mL/min)",
    "输入": [
      {
        "name": "ccr",
        "label": "尿肌酐清除率",
        "type": "number",
        "unit": "mL/min",
        "placeholder": "3"
      },
      {
        "name": "cur",
        "label": "尿素清除率",
        "type": "number",
        "unit": "mL/min",
        "placeholder": "2"
      }
    ],
    "计算结果": "function(v){return (v.ccr+v.cur)/2;}",
    "计算公式": "(CCr+CUr)/2",
    "公式解读": "综合肌酐和尿素清除率，评估透析患者残存的肾功能。",
    "参考范围": "透析患者>2mL/min有临床意义",
    "健康建议": "function(res, v){ if(res >= 2) return '残余肾功能为 ' + res + ' mL/min，具有重要临床意义，透析处方应注意避免超滤过度以保护残余肾。'; return '残余肾功能极低。患者容量控制完全依赖透析，需严格限制水钠摄入。'; }",
    "category": "肾脏病学",
    "适用人群": "透析患者",
    "临床场景": "透析处方调整"
  },
  {
    "id": "pro_intake",
    "title": "蛋白质摄入量",
    "输出": "推荐摄入量(g/d)",
    "输入": [
      {
        "name": "wt",
        "label": "体重",
        "type": "number",
        "unit": "kg",
        "placeholder": "60"
      },
      {
        "name": "target",
        "label": "目标系数",
        "type": "number",
        "unit": "g/kg/d",
        "placeholder": "0.6"
      }
    ],
    "计算结果": "function(v){return Math.round(v.wt*v.target);}",
    "计算公式": "体重 × 目标系数",
    "公式解读": "根据CKD分期设定每日蛋白质摄入上限。",
    "参考范围": "非透析CKD 0.6-0.8，透析1.0-1.2",
    "健康建议": "function(res, v){ if(v.target < 1.0) return '推荐每日蛋白摄入 ' + res + ' g。非透析期需优质低蛋白饮食以减轻肾脏负荷，可延缓肾病进展。'; return '推荐每日蛋白摄入 ' + res + ' g。透析患者需高蛋白饮食补充流失，预防蛋白质-能量消耗。'; }",
    "category": "肾脏病学",
    "适用人群": "CKD患者",
    "临床场景": "营养指导"
  },
  {
    "id": "na_corr_rate",
    "title": "低钠血症钠校正率",
    "输出": "每升液体血钠变化",
    "输入": [
      {
        "name": "naf",
        "label": "液体钠浓度",
        "type": "number",
        "unit": "mmol/L",
        "placeholder": "154"
      },
      {
        "name": "nas",
        "label": "实测血钠",
        "type": "number",
        "unit": "mmol/L",
        "placeholder": "120"
      },
      {
        "name": "tbw",
        "label": "总体水",
        "type": "number",
        "unit": "L",
        "placeholder": "36"
      }
    ],
    "计算结果": "function(v){return Math.round((v.naf-v.nas)/(v.tbw+1)*10)/10;}",
    "计算公式": "(液体钠-血钠)/(总体水+1)",
    "公式解读": "预测输入特定液体后的血钠升幅。",
    "参考范围": "24h内升幅<10mmol/L",
    "健康建议": "function(res, v){ if(res > 10) return '警告：输入1L该液体血钠升幅可能达 ' + res + ' mmol/L。24小时内升钠严禁超过10-12mmol/L，极易致脑桥髓鞘溶解症。'; return '该液体预计升钠 ' + res + ' mmol/L，请平稳滴注并密切监测。'; }",
    "category": "肾脏病学",
    "适用人群": "低钠血症",
    "临床场景": "制定补液计划"
  },
  {
    "id": "na_def_target",
    "title": "低钠血症时补钠值(自定义目标值)",
    "输出": "需补钠(mmol)",
    "输入": [
      {
        "name": "nat",
        "label": "目标钠",
        "type": "number",
        "unit": "mmol/L",
        "placeholder": "130"
      },
      {
        "name": "nas",
        "label": "实测钠",
        "type": "number",
        "unit": "mmol/L",
        "placeholder": "120"
      },
      {
        "name": "tbw",
        "label": "总体水",
        "type": "number",
        "unit": "L",
        "placeholder": "36"
      }
    ],
    "计算结果": "function(v){return Math.round((v.nat-v.nas)*v.tbw);}",
    "计算公式": "(目标钠-实测钠)×总体水",
    "公式解读": "计算达到目标浓度所需的钠盐量。",
    "参考范围": "无固定",
    "健康建议": "function(res, v){ return '达到目标血钠需补充钠盐 ' + res + ' mmol。重度低钠血症应分阶段缓慢纠正，避免快速波动。'; }",
    "category": "肾脏病学",
    "适用人群": "低钠血症",
    "临床场景": "急诊纠正低钠"
  },
  {
    "id": "nacl_def",
    "title": "低钠血症时补氯化钠值",
    "输出": "需补NaCl(g)",
    "输入": [
      {
        "name": "nat",
        "label": "目标钠",
        "type": "number",
        "unit": "mmol/L",
        "placeholder": "130"
      },
      {
        "name": "nas",
        "label": "实测钠",
        "type": "number",
        "unit": "mmol/L",
        "placeholder": "120"
      },
      {
        "name": "tbw",
        "label": "总体水",
        "type": "number",
        "unit": "L",
        "placeholder": "36"
      }
    ],
    "计算结果": "function(v){return Math.round((v.nat-v.nas)*v.tbw/17*10)/10;}",
    "计算公式": "(目标钠-实测钠)×总体水÷17",
    "公式解读": "将所需的mmol钠转换为克数(1g NaCl≈17mmol钠)。",
    "参考范围": "视缺钠程度",
    "健康建议": "function(res, v){ return '需补充氯化钠物理质量约 ' + res + ' g。临床常优先通过3%氯化钠静滴补充，输注时需严密预防急性肺水肿。'; }",
    "category": "肾脏病学",
    "适用人群": "低钠血症",
    "临床场景": "开具高渗盐水处方"
  },
  {
    "id": "na_def_std",
    "title": "低钠血症时补钠值",
    "输出": "总缺钠(mmol)",
    "输入": [
      {
        "name": "nas",
        "label": "实测钠",
        "type": "number",
        "unit": "mmol/L",
        "placeholder": "120"
      },
      {
        "name": "tbw",
        "label": "总体水",
        "type": "number",
        "unit": "L",
        "placeholder": "36"
      }
    ],
    "计算结果": "function(v){return Math.round((140-v.nas)*v.tbw);}",
    "计算公式": "(140-实测钠)×总体水",
    "公式解读": "按正常值140计算理论缺钠总量。",
    "参考范围": "正常135-145",
    "健康建议": "function(res, v){ return '理论总缺钠量为 ' + res + ' mmol。不可一次性补足，首个24小时通常仅补充计算量的1/3至1/2，分48-72小时纠正。'; }",
    "category": "肾脏病学",
    "适用人群": "低钠血症",
    "临床场景": "总体缺钠评估"
  },
  {
    "id": "egfr_mdrd",
    "title": "eGFR肾小球滤过率(2006年改良的IMDS-MDRD)",
    "输出": "eGFR(mL/min)",
    "输入": [
      {
        "name": "scr",
        "label": "肌酐",
        "type": "number",
        "unit": "umol/L",
        "placeholder": "90"
      },
      {
        "name": "age",
        "label": "年龄",
        "type": "number",
        "unit": "岁",
        "placeholder": "45"
      },
      {
        "name": "gen",
        "label": "女性=0.742",
        "type": "number",
        "unit": "系数",
        "placeholder": "1"
      }
    ],
    "计算结果": "function(v){return Math.round(175*Math.pow(v.scr/88.4,-1.154)*Math.pow(v.age,-0.203)*v.gen);}",
    "计算公式": "175×(Scr/88.4)^-1.154×年龄^-0.203",
    "公式解读": "经典的eGFR评估，适合中国人群改良。",
    "参考范围": ">90正常",
    "健康建议": "function(res, v){ if(res >= 90) return '肾小球滤过率正常。'; if(res >= 60) return '轻度下降，需控制血压血糖，避免肾毒性药物。'; if(res >= 30) return '中度受损，需在肾内科规律随访，防范并发症。'; if(res >= 15) return '重度受损，需准备肾脏替代治疗通路。'; return '终末期肾病，需评估透析治疗。'; }",
    "category": "肾脏病学",
    "适用人群": "成人",
    "临床场景": "CKD筛查"
  },
  {
    "id": "egfr_epi_cysc",
    "title": "eGFR肾小球滤过率(CKD-EPI 胱抑素C)",
    "输出": "eGFR(mL/min)",
    "输入": [
      {
        "name": "cysc",
        "label": "胱抑素C",
        "type": "number",
        "unit": "mg/L",
        "placeholder": "1.0"
      },
      {
        "name": "age",
        "label": "年龄",
        "type": "number",
        "unit": "岁",
        "placeholder": "45"
      },
      {
        "name": "gen",
        "label": "女性=0.962",
        "type": "number",
        "unit": "系数",
        "placeholder": "1"
      }
    ],
    "计算结果": "function(v){return Math.round(133*Math.pow(Math.min(v.cysc/0.8,1),-0.499)*Math.pow(Math.max(v.cysc/0.8,1),-1.328)*Math.pow(0.996,v.age)*v.gen);}",
    "计算公式": "133×min/max系数",
    "公式解读": "不受肌肉量干扰的肾功能评估。",
    "参考范围": ">90正常",
    "健康建议": "function(res, v){ if(res >= 90) return '胱抑素C模型评估正常，无实质性滤过功能障碍。'; return '结果偏低(' + res + ')。胱抑素C是早期肾损伤敏感指标，即使肌酐正常也需高度重视。'; }",
    "category": "肾脏病学",
    "适用人群": "成人",
    "临床场景": "早期肾损筛查"
  },
  {
    "id": "egfr_epi_cr",
    "title": "eGFR肾小球滤过率(CKD-EPI 肌酐)",
    "输出": "eGFR(mL/min)",
    "输入": [
      {
        "name": "scr",
        "label": "肌酐(mg/dL)",
        "type": "number",
        "unit": "mg/dL",
        "placeholder": "1.0"
      },
      {
        "name": "age",
        "label": "年龄",
        "type": "number",
        "unit": "岁",
        "placeholder": "45"
      },
      {
        "name": "gen",
        "label": "女0.7/男0.9",
        "type": "number",
        "unit": "k",
        "placeholder": "0.9"
      }
    ],
    "计算结果": "function(v){var a=v.gen===0.7?-0.329:-0.411; var g=v.gen===0.7?1.018:1; return Math.round(141*Math.pow(Math.min(v.scr/v.gen,1),a)*Math.pow(Math.max(v.scr/v.gen,1),-1.209)*Math.pow(0.993,v.age)*g);}",
    "计算公式": "CKD-EPI回归方程",
    "公式解读": "国际最推荐的肌酐eGFR公式。",
    "参考范围": ">90正常",
    "健康建议": "function(res, v){ if(res >= 60) return 'CKD-EPI评估为 ' + res + '。此公式在轻微受损阶段准确度优于MDRD，建议定期随访。'; return '滤过率低于60，存在明确慢性肾病风险，经肾排泄药物需严格下调剂量。'; }",
    "category": "肾脏病学",
    "适用人群": "成人",
    "临床场景": "常规评价"
  },
  {
    "id": "egfr_epi_crcysc",
    "title": "eGFR肾小球滤过率(CKD-EPI 肌酐-胱抑素C)",
    "输出": "eGFR(mL/min)",
    "输入": [
      {
        "name": "scr",
        "label": "肌酐(mg/dL)",
        "type": "number",
        "unit": "",
        "placeholder": "1.0"
      },
      {
        "name": "cysc",
        "label": "胱抑素C",
        "type": "number",
        "unit": "",
        "placeholder": "1.0"
      },
      {
        "name": "age",
        "label": "年龄",
        "type": "number",
        "unit": "",
        "placeholder": "45"
      }
    ],
    "计算结果": "function(v){return '公式复杂，建议机内后台联合运算(通常介于单指标之间)';}",
    "计算公式": "135×联合系数",
    "公式解读": "结合两者的优点，准确度最高。",
    "参考范围": ">90正常",
    "健康建议": "function(res, v){ return '此为联合推算，多用于临界值确诊。若结果长期偏低，仍需高度警惕心血管并发症的发展。'; }",
    "category": "肾脏病学",
    "适用人群": "成人",
    "临床场景": "精准测量"
  },
  {
    "id": "ped_io",
    "title": "儿童的入量和出量(每公斤和每小时)",
    "输出": "mL/kg/h",
    "输入": [
      {
        "name": "vol",
        "label": "液量",
        "type": "number",
        "unit": "mL",
        "placeholder": "100"
      },
      {
        "name": "wt",
        "label": "体重",
        "type": "number",
        "unit": "kg",
        "placeholder": "10"
      },
      {
        "name": "hrs",
        "label": "时间",
        "type": "number",
        "unit": "h",
        "placeholder": "4"
      }
    ],
    "计算结果": "function(v){return Math.round(v.vol/v.wt/v.hrs*100)/100;}",
    "计算公式": "总液体/(体重×时间)",
    "公式解读": "规范化儿童体液平衡。",
    "参考范围": "出量1-2mL/kg/h正常",
    "健康建议": "function(res, v){ if(res < 1) return '速率为 ' + res + ' mL/kg/h，提示可能存在少尿期，需严格限制入量并评估肾脏负荷。'; return '速率为 ' + res + ' mL/kg/h，处于正常儿童排液速率范围。'; }",
    "category": "肾脏病学",
    "适用人群": "儿童",
    "临床场景": "儿科重症监护"
  },
  {
    "id": "feca",
    "title": "钙排泄分数",
    "输出": "FECa(%)",
    "输入": [
      {
        "name": "uca",
        "label": "尿钙",
        "type": "number",
        "unit": "",
        "placeholder": "2"
      },
      {
        "name": "pca",
        "label": "血钙",
        "type": "number",
        "unit": "",
        "placeholder": "2.4"
      },
      {
        "name": "ucr",
        "label": "尿肌酐",
        "type": "number",
        "unit": "",
        "placeholder": "8000"
      },
      {
        "name": "pcr",
        "label": "血肌酐",
        "type": "number",
        "unit": "",
        "placeholder": "90"
      }
    ],
    "计算结果": "function(v){return Math.round((v.uca*v.pcr)/(v.pca*v.ucr)*10000)/100;}",
    "计算公式": "(Uca×Pcr)/(Pca×Ucr)×100",
    "公式解读": "鉴别高钙血症病因。",
    "参考范围": "<1%FHH，>2%甲亢",
    "健康建议": "function(res, v){ if(res < 1) return 'FECa<1%，在合并高钙血症时高度提示家族性低尿钙高钙血症(FHH)，切忌误行甲状旁腺切除术。'; if(res > 2) return 'FECa>2%，若伴高血钙，强烈提示原发性甲状旁腺功能亢进。'; return '结果处于临界区，建议排除干扰后结合PTH综合判断。'; }",
    "category": "肾脏病学",
    "适用人群": "高钙患者",
    "临床场景": "内分泌及肾脏排泄分析"
  },
  {
    "id": "child_pugh_score_v2",
    "title": "肝硬化肝功能 Child-Pugh 评分",
    "version": "2.0",
    "输出": "肝功能分级 (A/B/C) 及病死率预测",
    "输入": [
      {
        "name": "encephalopathy",
        "label": "1. 肝性脑病 (分期)",
        "type": "radio",
        "options": [
          {
            "label": "无 (1分)",
            "value": 1
          },
          {
            "label": "1-2期: 嗜睡/性格改变 (2分)",
            "value": 2
          },
          {
            "label": "3-4期: 昏迷/谵妄 (3分)",
            "value": 3
          }
        ]
      },
      {
        "name": "ascites",
        "label": "2. 腹水 (体检/超声)",
        "type": "radio",
        "options": [
          {
            "label": "无腹水 (1分)",
            "value": 1
          },
          {
            "label": "轻度: 仅 B 超可见 (2分)",
            "value": 2
          },
          {
            "label": "中重度: 移动性浊音 (+) 或张力性 (3分)",
            "value": 3
          }
        ]
      },
      {
        "name": "bilirubin",
        "label": "3. 总胆红素 (μmol/L)",
        "type": "radio",
        "options": [
          {
            "label": "< 34 (1分)",
            "value": 1
          },
          {
            "label": "34 - 51 (2分)",
            "value": 2
          },
          {
            "label": "> 51 (3分)",
            "value": 3
          }
        ]
      },
      {
        "name": "albumin",
        "label": "4. 血清白蛋白 (g/L)",
        "type": "radio",
        "options": [
          {
            "label": "> 35 (1分)",
            "value": 1
          },
          {
            "label": "28 - 35 (2分)",
            "value": 2
          },
          {
            "label": "< 28 (3分)",
            "value": 3
          }
        ]
      },
      {
        "name": "inr_pt",
        "label": "5. 凝血酶原时间 (INR 或 PT延长秒数)",
        "type": "radio",
        "options": [
          {
            "label": "INR < 1.7 (或 PT延长 < 4s) (1分)",
            "value": 1
          },
          {
            "label": "INR 1.7-2.3 (或 PT延长 4-6s) (2分)",
            "value": 2
          },
          {
            "label": "INR > 2.3 (或 PT延长 > 6s) (3分)",
            "value": 3
          }
        ]
      }
    ],
    "计算结果": "function(v){ var s = v.encephalopathy + v.ascites + v.bilirubin + v.albumin + v.inr_pt; var grade = ''; var survival = ''; if(s <= 6) { grade = 'A 级'; survival = '1年存活率 100%, 2年 85%'; } else if(s <= 9) { grade = 'B 级'; survival = '1年存活率 80%, 2年 60%'; } else { grade = 'C 级'; survival = '1年存活率 45%, 2年 35%'; } return '总分: ' + s + ' 分 | Child-Pugh 分级: ' + grade + ' (' + survival + ')'; }",
    "计算公式": "Child-Pugh Score = 脑病 + 腹水 + 胆红素 + 白蛋白 + 凝血",
    "公式解读": "决策逻辑：1. A 级为肝功能代偿期；2. B 级为失代偿期起点；3. C 级为终末期，手术风险极高。",
    "参考范围": "原发性胆汁性胆管炎 (PBC) 胆红素分界线不同 (1分:<68, 2分:68-170, 3分:>170)",
    "健康建议": "function(res, v){ if(res.includes('C 级')){ return '【紧急医疗提示】肝功能严重失代偿！1. 建议评估肝移植适应症；2. 严格限制钠盐摄入；3. 预防消化道出血及肝性脑病；4. 慎用经肝代谢药物。'; } if(res.includes('B 级')){ return '【临床干预】提示肝功能中度受损。1. 积极保肝治疗及病因治疗；2. 若行腹部大手术，围手术期病死率约 30%。'; } return '【健康管理】肝功能代偿良好。继续病因治疗（如抗病毒），定期复查胃镜及甲胎蛋白。'; }",
    "category": "肾脏病学",
    "适用人群": "各类肝硬化患者",
    "clinical_scenario": "评估肝硬化预后、肝癌手术风险评估、肝移植排队优先级参考"
  },
  {
    "id": "free_water_def",
    "title": "高钠血症患者游离水缺乏量计算",
    "输出": "缺水(L)",
    "输入": [
      {
        "name": "nas",
        "label": "实测钠",
        "type": "number",
        "unit": "mmol/L",
        "placeholder": "155"
      },
      {
        "name": "tbw",
        "label": "总体水",
        "type": "number",
        "unit": "L",
        "placeholder": "36"
      }
    ],
    "计算结果": "function(v){return Math.round(v.tbw*(v.nas/140-1)*10)/10;}",
    "计算公式": "TBW×(Na/140-1)",
    "公式解读": "高渗脱水需补充的水量。",
    "参考范围": "视脱水程度",
    "健康建议": "function(res, v){ if(res > 4) return '重度高渗脱水(缺水> ' + res + ' L)。切忌快速大量输注低张溶液防脑水肿，建议缓慢纠正。'; return '轻中度失水，在胃肠功能允许时，首选经消化道补充水分。'; }",
    "category": "肾脏病学",
    "适用人群": "高钠血症",
    "临床场景": "纠正高渗状态"
  },
  {
    "id": "ccr_cg",
    "title": "eGFR肾小球滤过率(Cockcroft-Gault)计算公式",
    "输出": "CCr(mL/min)",
    "输入": [
      {
        "name": "age",
        "label": "年龄",
        "type": "number",
        "unit": "",
        "placeholder": "50"
      },
      {
        "name": "wt",
        "label": "体重",
        "type": "number",
        "unit": "kg",
        "placeholder": "60"
      },
      {
        "name": "scr",
        "label": "肌酐(umol/L)",
        "type": "number",
        "unit": "",
        "placeholder": "90"
      },
      {
        "name": "gen",
        "label": "女性=0.85",
        "type": "number",
        "unit": "",
        "placeholder": "1"
      }
    ],
    "计算结果": "function(v){return Math.round((140-v.age)*v.wt/(v.scr*0.818)*v.gen);}",
    "计算公式": "(140-年龄)×体重/(0.818×Scr)",
    "公式解读": "药代动力学剂量调整金标准。",
    "参考范围": "80-120",
    "健康建议": "function(res, v){ if(res < 30) return '清除率显著低下(<30)。极易蓄积中毒，指导抗生素等药物必须大幅减量。'; return '清除率尚可，常规药物一般可按标准剂量给药。'; }",
    "category": "肾脏病学",
    "适用人群": "成人",
    "临床场景": "药物剂量调整"
  },
  {
    "id": "kdigo_aki_staging_2026_fixed",
    "title": "KDIGO 急性肾损伤 (AKI) 分级",
    "version": "1.1",
    "输出": "AKI 临床分期及干预决策",
    "输入": [
      {
        "name": "baseline_scr",
        "label": "1. 基础血肌酐 (μmol/L)",
        "type": "number",
        "placeholder": "发病前或入院基准值"
      },
      {
        "name": "current_scr",
        "label": "2. 当前血肌酐 (μmol/L)",
        "type": "number",
        "placeholder": "48小时内最小值或7天内最高值"
      },
      {
        "name": "uo_status",
        "label": "3. 尿量表现 (持续时长)",
        "type": "radio",
        "options": [
          "正常 ( > 0.5 ml/kg/h )",
          "1期: < 0.5 ml/kg/h 持续 6-12h",
          "2期: < 0.5 ml/kg/h 持续 ≥ 12h",
          "3期: < 0.3 ml/kg/h ≥ 24h 或无尿 ≥ 12h"
        ]
      },
      {
        "name": "rrt_initiation",
        "label": "4. 是否已启动肾替代治疗 (RRT)",
        "type": "checkbox"
      }
    ],
    "计算结果": "function(v){ var ratio = v.current_scr / v.baseline_scr; var diff = v.current_scr - v.baseline_scr; var uo_val = v.uo_status.includes('3期')?3:(v.uo_status.includes('2期')?2:(v.uo_status.includes('1期')?1:0)); var stage = 0; if(ratio >= 3.0 || v.current_scr >= 353.6 || uo_val === 3 || v.rrt_initiation) stage = 3; else if(ratio >= 2.0 || uo_val === 2) stage = 2; else if(ratio >= 1.5 || diff >= 26.5 || uo_val === 1) stage = 1; if(stage === 0) return '未达到 AKI 诊断标准'; return 'KDIGO AKI ' + stage + ' 期'; }",
    "计算公式": "基于血肌酐较基线升幅及尿量持续减少时长",
    "公式解读": "决策逻辑：1. 48h内肌酐升高≥26.5μmol/L即诊断1期；2. 353.6μmol/L为3期红线；3. 启动RRT直接定为3期。",
    "健康建议": "function(res, v){ if(res.includes('3 期')){ return '【高危决策】1. 立即咨询肾内科；2. 评估 RRT 指征；3. 停用所有肾毒性药物。'; } if(res.includes('2 期')){ return '【临床干预】1. 纠正肾前性/肾后性因素；2. 调整药物剂量。'; } return '【日常监测】1. 维持容量平衡；2. 动态复查肌酐。'; }",
    "category": "肾脏病学"
  },
  {
    "id": "ckd_kdigo_staging_2026_fixed",
    "title": "慢性肾脏病 (CKD) 分期与风险评估",
    "version": "2.1",
    "输出": "CKD 分期及风险热力图等级",
    "输入": [
      {
        "name": "egfr",
        "label": "1. 估算肾小球滤过率 (eGFR, ml/min/1.73m²)",
        "type": "number"
      },
      {
        "name": "acr_status",
        "label": "2. 尿白蛋白/肌酐比值 (ACR)",
        "type": "radio",
        "options": [
          "A1: 正常或轻度升高 (< 30mg/g)",
          "A2: 中度升高 (30-300mg/g)",
          "A3: 重度升高 (> 300mg/g)"
        ]
      },
      {
        "name": "duration_gt_3m",
        "label": "3. 病程是否已持续 ≥ 3 个月",
        "type": "checkbox"
      }
    ],
    "计算结果": "function(v){ if(!v.duration_gt_3m) return '未达到 CKD 诊断标准：病程需 ≥ 3 个月'; var g = ''; var risk = ''; if(v.egfr >= 90) g = 'G1'; else if(v.egfr >= 60) g = 'G2'; else if(v.egfr >= 45) g = 'G3a'; else if(v.egfr >= 30) g = 'G3b'; else if(v.egfr >= 15) g = 'G4'; else g = 'G5'; var a_val = v.acr_status.includes('A1')?1:(v.acr_status.includes('A2')?2:3); var a = 'A' + a_val; if(g==='G1'||g==='G2'){ if(a_val===1) risk='低风险 (绿色)'; else if(a_val===2) risk='中度风险 (黄色)'; else risk='高风险 (橙色)'; } else if(g==='G3a'){ if(a_val===1) risk='中度风险 (黄色)'; else if(a_val===2) risk='高风险 (橙色)'; else risk='极高风险 (红色)'; } else { risk='极高风险 (红色)'; } return '分期组合：' + g + a + ' | 风险等级：' + risk; }",
    "公式解读": "决策逻辑：1. G分级看排泄能力；2. A分级看损伤严重度；3. 诊断CKD需满足病程 ≥ 3个月。",
    "健康建议": "function(res, v){ if(res.includes('红色')){ return '【紧急医疗路径】1. 每3个月复查；2. 严格管血压(<130/80)；3. 启动RAS阻断剂；4. 准备RRT咨询。'; } if(res.includes('橙色')){ return '【强化管理】1. 每年至少复查3次；2. 控糖控盐；3. 评估贫血等合并症。'; } return '【常规随访】1. 每年复查1次；2. 避用肾毒性药物；3. 健康生活。'; }",
    "category": "肾脏病学"
  },
  {
    "id": "femg",
    "title": "镁排泄分数",
    "输出": "FEMg(%)",
    "输入": [
      {
        "name": "umg",
        "label": "尿镁",
        "type": "number",
        "unit": "",
        "placeholder": "3"
      },
      {
        "name": "pmg",
        "label": "血镁",
        "type": "number",
        "unit": "",
        "placeholder": "0.8"
      },
      {
        "name": "ucr",
        "label": "尿肌酐",
        "type": "number",
        "unit": "",
        "placeholder": "8000"
      },
      {
        "name": "pcr",
        "label": "血肌酐",
        "type": "number",
        "unit": "",
        "placeholder": "90"
      }
    ],
    "计算结果": "function(v){return Math.round((v.umg*v.pcr)/(v.pmg*0.7*v.ucr)*10000)/100;}",
    "计算公式": "(Umg×Pcr)/(Pmg×0.7×Ucr)",
    "公式解读": "血镁结合蛋白比例校正0.7。",
    "参考范围": ">4%为肾性丢失",
    "健康建议": "function(res, v){ if(res > 4) return 'FEMg>4%，提示肾性失镁。用于鉴别低镁血症原因，排查药物干扰或肾小管疾病。'; return 'FEMg<2%，提示肾脏镁保留机制完好，低镁血症根源多为肾外丢失。'; }",
    "category": "肾脏病学",
    "适用人群": "低镁患者",
    "临床场景": "电解质紊乱鉴别"
  },
  {
    "id": "fena",
    "title": "钠排泄分数",
    "输出": "FENa(%)",
    "输入": [
      {
        "name": "una",
        "label": "尿钠",
        "type": "number",
        "unit": "",
        "placeholder": "40"
      },
      {
        "name": "pna",
        "label": "血钠",
        "type": "number",
        "unit": "",
        "placeholder": "140"
      },
      {
        "name": "ucr",
        "label": "尿肌酐",
        "type": "number",
        "unit": "",
        "placeholder": "8000"
      },
      {
        "name": "pcr",
        "label": "血肌酐",
        "type": "number",
        "unit": "",
        "placeholder": "150"
      }
    ],
    "计算结果": "function(v){return Math.round((v.una*v.pcr)/(v.pna*v.ucr)*10000)/100;}",
    "计算公式": "(Una×Pcr)/(Pna×Ucr)",
    "公式解读": "最经典AKI鉴别指标。",
    "参考范围": "<1%肾前性，>2%肾性",
    "健康建议": "function(res, v){ if(res < 1) return 'FENa<1%，提示肾前性急性肾损伤。建议在心功能允许下快速扩容。'; if(res > 2) return 'FENa>2%，提示急性肾小管坏死(ATN)。严禁盲目输液防心衰。受利尿剂干扰大时建议改用FEUrea。'; return '结果处于灰区，建议结合临床综合判断。'; }",
    "category": "肾脏病学",
    "适用人群": "AKI患者",
    "临床场景": "少尿鉴别"
  },
  {
    "id": "upro_est",
    "title": "尿蛋白排泄量估计",
    "输出": "估计24h尿蛋白(g)",
    "输入": [
      {
        "name": "upcr",
        "label": "尿蛋白/肌酐比(mg/g)",
        "type": "number",
        "unit": "",
        "placeholder": "1500"
      },
      {
        "name": "ucr24",
        "label": "预估24h尿肌酐(g)",
        "type": "number",
        "unit": "",
        "placeholder": "1.2"
      }
    ],
    "计算结果": "function(v){return Math.round(v.upcr*v.ucr24/1000*100)/100;}",
    "计算公式": "UPCR × 24h尿肌酐量",
    "公式解读": "通过随机尿估计全天蛋白丢失。",
    "参考范围": "<0.15g/d",
    "健康建议": "function(res, v){ if(res > 3.5) return '估测尿蛋白高达 ' + res + ' g。符合肾病综合征大量蛋白尿标准，需紧急干预。'; return '估算值为 ' + res + ' g/d。门诊快速评估，方便替代24h蓄尿留取。'; }",
    "category": "肾脏病学",
    "适用人群": "蛋白尿患者",
    "临床场景": "门诊快速评估"
  },
  {
    "id": "feurea",
    "title": "尿素排泄分数",
    "输出": "FEUrea(%)",
    "输入": [
      {
        "name": "uur",
        "label": "尿尿素",
        "type": "number",
        "unit": "",
        "placeholder": "150"
      },
      {
        "name": "pur",
        "label": "血尿素",
        "type": "number",
        "unit": "",
        "placeholder": "15"
      },
      {
        "name": "ucr",
        "label": "尿肌酐",
        "type": "number",
        "unit": "",
        "placeholder": "8000"
      },
      {
        "name": "pcr",
        "label": "血肌酐",
        "type": "number",
        "unit": "",
        "placeholder": "150"
      }
    ],
    "计算结果": "function(v){return Math.round((v.uur*v.pcr)/(v.pur*v.ucr)*10000)/100;}",
    "计算公式": "(Uur×Pcr)/(Pur×Ucr)",
    "公式解读": "在使用利尿剂时替代FENa判断肾前性AKI。",
    "参考范围": "<35%提示肾前性",
    "健康建议": "function(res, v){ if(res < 35) return 'FEUrea < 35%，提示肾前性AKI。建议在评估心功能后积极扩容。'; return 'FEUrea > 35%，可能存在肾小管器质性损伤，需结合临床综合判断。'; }",
    "category": "肾脏病学",
    "适用人群": "使用利尿剂的AKI",
    "临床场景": "心衰并发AKI"
  },
  {
    "id": "bun_cr_ratio",
    "title": "尿素氮/肌酐比值(BUN/Cr)",
    "输出": "比值",
    "输入": [
      {
        "name": "bun",
        "label": "BUN(mg/dL)",
        "type": "number",
        "unit": "",
        "placeholder": "20"
      },
      {
        "name": "cr",
        "label": "Cr(mg/dL)",
        "type": "number",
        "unit": "",
        "placeholder": "1.0"
      }
    ],
    "计算结果": "function(v){return Math.round(v.bun/v.cr);}",
    "计算公式": "BUN ÷ Cr",
    "公式解读": "鉴别急慢性肾衰和脱水。",
    "参考范围": ">20提示肾前性或高蛋白饮食",
    "健康建议": "function(res, v){ if(res > 20) return '比值>20，提示可能存在肾前性因素(如脱水、消化道出血)或高蛋白饮食。'; return '比值≤20，若肾功能异常，多倾向于肾脏实质性损害。'; }",
    "category": "肾脏病学",
    "适用人群": "肾功异常者",
    "临床场景": "检验报告解读"
  },
  {
    "id": "feua",
    "title": "尿酸排泄分数(FEUA)",
    "输出": "FEUA(%)",
    "输入": [
      {
        "name": "uua",
        "label": "尿尿酸",
        "type": "number",
        "unit": "",
        "placeholder": "3000"
      },
      {
        "name": "pua",
        "label": "血尿酸",
        "type": "number",
        "unit": "",
        "placeholder": "400"
      },
      {
        "name": "ucr",
        "label": "尿肌酐",
        "type": "number",
        "unit": "",
        "placeholder": "8000"
      },
      {
        "name": "pcr",
        "label": "血肌酐",
        "type": "number",
        "unit": "",
        "placeholder": "90"
      }
    ],
    "计算结果": "function(v){return Math.round((v.uua*v.pcr)/(v.pua*v.ucr)*10000)/100;}",
    "计算公式": "(Uua×Pcr)/(Pua×Ucr)",
    "公式解读": "评估尿酸排泄障碍程度。",
    "参考范围": "7%-12%",
    "健康建议": "function(res, v){ if(res < 7) return 'FEUA < 7%，提示尿酸排泄不良型，可考虑使用促尿酸排泄药物。'; if(res > 12) return 'FEUA > 12%，提示尿酸生成过多型，建议使用抑制尿酸生成药物。'; return '排泄分数正常，可能为混合型痛风。'; }",
    "category": "肾脏病学",
    "适用人群": "高尿酸血症",
    "临床场景": "痛风分型"
  },
  {
    "id": "uag",
    "title": "尿阴离子间隙",
    "输出": "UAG(mmol/L)",
    "输入": [
      {
        "name": "una",
        "label": "尿钠",
        "type": "number",
        "unit": "",
        "placeholder": "40"
      },
      {
        "name": "uk",
        "label": "尿钾",
        "type": "number",
        "unit": "",
        "placeholder": "30"
      },
      {
        "name": "ucl",
        "label": "尿氯",
        "type": "number",
        "unit": "",
        "placeholder": "80"
      }
    ],
    "计算结果": "function(v){return v.una+v.uk-v.ucl;}",
    "计算公式": "Na + K - Cl",
    "公式解读": "间接反映尿铵(NH4+)排泄。",
    "参考范围": "负值正常，正值提示肾小管酸中毒",
    "健康建议": "function(res, v){ if(res > 0) return 'UAG为正值，提示肾脏排泄酸性物质障碍，高度怀疑远端肾小管酸中毒(I型RTA)。'; return 'UAG为负值，提示肾脏泌酸代偿功能正常，酸中毒多源于肾外(如肠道)丢失。'; }",
    "category": "肾脏病学",
    "适用人群": "代谢性酸中毒",
    "临床场景": "RTA鉴别"
  },
  {
    "id": "adult_sirs_criteria_fixed_v3",
    "title": "全身炎症反应综合征 (SIRS) 诊断标准",
    "version": "3.0",
    "输出": "SIRS 判定结果及临床风险分层",
    "输入": [
      {
        "name": "temp_status",
        "label": "1. 体温 (核心温)",
        "type": "radio",
        "options": [
          "正常 (36.0°C - 38.0°C)",
          "异常: > 38.0°C 或 < 36.0°C"
        ]
      },
      {
        "name": "hr_status",
        "label": "2. 心率 (HR)",
        "type": "radio",
        "options": [
          "正常 (≤ 90 次/分)",
          "增快: > 90 次/分"
        ]
      },
      {
        "name": "rr_status",
        "label": "3. 呼吸 (RR) 或 PaCO2",
        "type": "radio",
        "options": [
          "正常",
          "增快: RR > 20 次/分 或 PaCO2 < 32 mmHg"
        ]
      },
      {
        "name": "wbc_status",
        "label": "4. 白细胞计数 (WBC) 或分类",
        "type": "radio",
        "options": [
          "正常",
          "异常: > 12×10⁹/L 或 < 4×10⁹/L 或 杆状核 > 10%"
        ]
      }
    ],
    "计算结果": "function(v){ var count = 0; if(v.temp_status && v.temp_status.includes('异常')) count += 1; if(v.hr_status && v.hr_status.includes('增快')) count += 1; if(v.rr_status && v.rr_status.includes('增快')) count += 1; if(v.wbc_status && v.wbc_status.includes('异常')) count += 1; if(count >= 2) return '符合 SIRS 诊断 (' + count + '项阳性)'; return '未达到 SIRS 诊断标准'; }",
    "计算公式": "上述 4 项指标中至少满足 2 项",
    "公式解读": "决策逻辑：1. SIRS 是机体对各种损伤（感染或非感染）的非特异性炎症反应；2. 2 项阳性是触发脓毒症 (Sepsis) 筛查的起点；3. 需排除由于运动、焦虑或药物引起的暂时性心率/呼吸增快。",
    "参考范围": "成人通用标准 (ACCP/SCCM)",
    "健康建议": "function(res, v){ if(res.includes('符合')){ return '【临床分流】1. 若存在明确或疑似感染源，立即按 Sepsis-3 指南进行 qSOFA 评分；2. 监测血压、尿量及神志变化；3. 完善血常规、CRP 及 PCT 检查。'; } return '【监测建议】目前未达诊断标准。若患者出现畏寒、寒战或腰痛，请每 4-8 小时复测体温及生命体征。'; }",
    "category": "肾脏病学",
    "适用人群": "成人疑似感染或炎症状态患者",
    "临床场景": "急性肾盂肾炎全身中毒症状评估、透析热鉴别诊断"
  },
  {
    "id": "rcc_tnm_staging_v8_fixed",
    "title": "肾细胞癌 (RCC) TNM 分期评估",
    "version": "8.0",
    "输出": "TNM 组合分期 (I-IV 期)",
    "输入": [
      {
        "name": "t_stage",
        "label": "1. 原发肿瘤 (T) 范围",
        "type": "radio",
        "options": [
          "T1a: 肿瘤 ≤ 4cm, 局限于肾内",
          "T1b: 肿瘤 4-7cm, 局限于肾内",
          "T2a: 肿瘤 7-10cm, 局限于肾内",
          "T2b: 肿瘤 > 10cm, 局限于肾内",
          "T3a: 侵犯肾周脂肪/肾静脉/肾窦脂肪",
          "T3b/c: 侵犯膈下/膈上腔静脉",
          "T4: 侵犯肾上腺或 Gerota 筋膜外"
        ]
      },
      {
        "name": "n_stage",
        "label": "2. 区域淋巴结 (N)",
        "type": "radio",
        "options": [
          "N0: 无淋巴结转移",
          "N1: 存在区域淋巴结转移"
        ]
      },
      {
        "name": "m_stage",
        "label": "3. 远处转移 (M)",
        "type": "radio",
        "options": [
          "M0: 无远处转移",
          "M1: 存在远处转移 (肺/骨/脑等)"
        ]
      }
    ],
    "计算结果": "function(v){ if(v.m_stage && v.m_stage.includes('M1')) return 'IV 期 (晚期/转移性)'; if(v.t_stage && v.t_stage.includes('T4')) return 'IV 期 (局部晚期)'; if(v.n_stage && v.n_stage.includes('N1')) return 'III 期 (淋巴结受累)'; if(v.t_stage && v.t_stage.includes('T3')) return 'III 期'; if(v.t_stage && v.t_stage.includes('T2')) return 'II 期'; return 'I 期 (早期)'; }",
    "计算公式": "根据 AJCC 第 8 版肾癌 TNM 分期矩阵",
    "公式解读": "决策逻辑：1. T1/T2 为局限性肾癌；2. T3 意味着肿瘤已突破肾包膜进入脂肪或静脉血管；3. N1 或 M1 意味着分期直接跨入中晚期。",
    "参考范围": "仅适用于肾细胞癌，不适用于肾盂癌 (尿路上皮癌)",
    "健康建议": "function(res, v){ if(res.includes('I 期')){ return '【手术决策】首选保留肾单位手术 (NSS) 或腹腔镜肾部分切除术，5年生存率 > 95%。'; } if(res.includes('III') || res.includes('IV')){ return '【强化治疗】1. 建议行根治性肾切除术；2. 评估靶向治疗 (TKI) 或免疫检查点抑制剂 (PD-1)；3. 需多学科会诊 (MDT)。'; } return '【诊疗建议】建议行根治性或部分肾切除，定期复查监控复发。'; }",
    "category": "肾脏病学",
    "适用人群": "疑似或确诊肾占位患者",
    "临床场景": "术前分期评估、手术方案制定、预后风险分层"
  },
  {
    "id": "bosniak_renal_cyst_2019_fixed",
    "title": "肾囊性病变 Bosniak 分级 (v2019)",
    "version": "2.0",
    "输出": "Bosniak 分级及恶性风险/处置建议",
    "输入": [
      {
        "name": "cyst_features",
        "label": "1. 囊肿影像学特征",
        "type": "radio",
        "options": [
          "I 类: 单纯性薄壁囊肿 (无分隔/无钙化/无强化)",
          "II 类: 少许薄分隔 (<3个), 或有细小钙化",
          "IIF 类: 较多薄分隔, 或囊壁/分隔均匀增厚",
          "III 类: 囊壁或分隔明显不规则增厚, 伴强化",
          "IV 类: 具有明显的强化软组织结节"
        ]
      },
      {
        "name": "modality",
        "label": "2. 检查手段",
        "type": "radio",
        "options": [
          "增强 CT",
          "增强 MRI"
        ]
      }
    ],
    "计算结果": "function(v){ var res = v.cyst_features; var risk = ''; var action = ''; if(res.includes('I 类')) { risk = '< 1%'; action = '无需随访'; } else if(res.includes('II 类')) { risk = '0-5%'; action = '无需随访'; } else if(res.includes('IIF')) { risk = '5-10%'; action = '建议影像学随访 (半年/一年)'; } else if(res.includes('III')) { risk = '约 50%'; action = '建议手术或严密随访'; } else { risk = '> 80%'; action = '建议手术治疗 (可能为囊性肾癌)'; } return 'Bosniak 分级判定: ' + res.split(':')[0] + ' | 恶性风险：' + risk + ' | 处置建议：' + action; }",
    "计算公式": "基于 Bosniak 2019 影像学形态学分级标准",
    "公式解读": "决策逻辑：1. I-II 类为良性；2. IIF (Follow) 类需定期复查以观察动态变化；3. III-IV 类高度怀疑恶性。",
    "参考范围": "适用于 CT 或 MRI 增强扫描，不适用于单纯超声",
    "健康建议": "function(res, v){ if(res.includes('III') || res.includes('IV')){ return '【外科干预建议】1. 建议泌尿外科就诊，评估肾部分切除术可行性；2. 术前完善胸部 CT 排除转移。'; } if(res.includes('IIF')){ return '【随访建议】建议 6 个月后复查增强 CT/MRI。若分隔增多、壁变厚或出现结节，需上调分级。'; } return '【健康提示】目前考虑良性病变。若无腰痛、血尿等症状，通常不需要特殊处理，年度常规体检即可。'; }",
    "category": "肾脏病学",
    "适用人群": "影像学发现肾囊性占位的患者",
    "临床场景": "肾囊肿良恶性评估"
  },
  {
    "id": "acc_ensat_staging_2026_fixed",
    "title": "肾上腺皮质癌 (ACC) ENSAT/TNM 分期",
    "version": "2.0",
    "输出": "ENSAT 临床分期 (I-IV 期)",
    "输入": [
      {
        "name": "t_stage",
        "label": "1. 原发肿瘤 (T) 范围",
        "type": "radio",
        "options": [
          "T1: 肿瘤最大径 ≤ 5cm, 局限于肾上腺",
          "T2: 肿瘤最大径 > 5cm, 局限于肾上腺",
          "T3: 肿瘤侵犯周围脂肪组织",
          "T4: 肿瘤侵犯邻近器官 (肾/胰/脾/肝) 或大血管"
        ]
      },
      {
        "name": "n_stage",
        "label": "2. 区域淋巴结 (N)",
        "type": "radio",
        "options": [
          "N0: 无区域淋巴结转移",
          "N1: 存在区域淋巴结转移"
        ]
      },
      {
        "name": "m_stage",
        "label": "3. 远处转移 (M)",
        "type": "radio",
        "options": [
          "M0: 无远处转移",
          "M1: 存在远处转移 (肺/骨等)"
        ]
      }
    ],
    "计算结果": "function(v){ if(v.m_stage && v.m_stage.includes('M1')) return 'IV 期 (晚期转移性)'; if((v.t_stage && v.t_stage.includes('T4')) || (v.n_stage && v.n_stage.includes('N1'))) return 'III 期 (局部晚期)'; if(v.t_stage && v.t_stage.includes('T2')) return 'II 期 (局限性大肿瘤)'; return 'I 期 (局限性小肿瘤)'; }",
    "计算公式": "基于 ENSAT (European Network for the Study of Adrenal Tumors) 标准",
    "公式解读": "决策逻辑：1. 5cm 是 T1/T2 的核心界限；2. 只要淋巴结阳性 (N1)，分期直接进入 III 期；3. IV 期仅保留给有远处转移 (M1) 的患者。",
    "参考范围": "该标准对预后的评估比 AJCC 第八版更精准",
    "健康建议": "function(res, v){ if(res.includes('IV')){ return '【姑息与全身治疗】1. 考虑米托坦 (Mitotane) 联合化疗 (EDP方案)；2. 评估减瘤手术的可能性。'; } if(res.includes('III')){ return '【强化外科决策】1. 建议行根治性切除及淋巴结清扫；2. 术后高度推荐米托坦辅助治疗。'; } return '【根治性手术】1. 尽早行开腹或腹腔镜下肿瘤完整切除；2. 定期复查激素水平。'; }",
    "category": "肾脏病学",
    "适用人群": "疑似或确诊肾上腺皮质癌患者",
    "临床场景": "手术范围分级、术后辅助用药评估"
  },
  {
    "id": "renal_failure_index_calc",
    "title": "肾衰指数 (RFI) 鉴别诊断",
    "version": "1.0",
    "输出": "肾衰类型判定 (肾前性 vs 肾性)",
    "输入": [
      {
        "name": "u_na",
        "label": "1. 尿钠 (UNa, mmol/L)",
        "type": "number",
        "placeholder": "测定值"
      },
      {
        "name": "u_cr",
        "label": "2. 尿肌酐 (UCr, μmol/L 或 mg/dL)",
        "type": "number",
        "placeholder": "测定值"
      },
      {
        "name": "p_cr",
        "label": "3. 血肌酐 (PCr, μmol/L 或 mg/dL)",
        "type": "number",
        "placeholder": "测定值"
      }
    ],
    "计算结果": "function(v){ var rfi = v.u_na / (v.u_cr / v.p_cr); var res = rfi.toFixed(2); if(res < 1) return 'RFI = ' + res + ' (提示：肾前性氮质血症)'; if(res > 2) return 'RFI = ' + res + ' (提示：急性肾小管坏死 ATN)'; return 'RFI = ' + res + ' (灰色地带：需结合临床综合判断)'; }",
    "计算公式": "RFI = 尿钠 / (尿肌酐 / 血肌酐)",
    "公式解读": "决策逻辑：1. RFI < 1：肾小管重吸收钠的功能尚好，支持灌注不足（肾前性）；2. RFI > 1 (尤其是 > 2)：肾小管受损，无法重吸收钠，支持器质性损伤（肾性）。",
    "参考范围": "需在利尿剂使用前测定，否则结果不可信",
    "健康建议": "function(res, v){ if(res.includes('肾前性')){ return '【处理策略】1. 积极补充血容量（补液）；2. 改善心输出量；3. 停用影响肾灌注的药物（如 NSAIDs/ACEI）。通常肾功能可迅速恢复。'; } if(res.includes('ATN')){ return '【处理策略】1. 严格限制水、钠、钾摄入；2. 避免肾毒性药物；3. 监测电解质及酸碱平衡，必要时启动血液透析。'; } return '【临床建议】建议加测“钠排泄分数 (FeNa)”，并动态观察尿常规中是否有管型。'; }",
    "category": "肾脏病学",
    "适用人群": "急性少尿或进行性肌酐升高的患者",
    "clinical_scenario": "急性肾损伤 (AKI) 的病因病理分类"
  },
  {
    "id": "ttkg",
    "title": "肾小管钾浓度梯度(TTKG)计算",
    "输出": "TTKG",
    "输入": [
      {
        "name": "uk",
        "label": "尿钾",
        "type": "number",
        "unit": "",
        "placeholder": "40"
      },
      {
        "name": "pk",
        "label": "血钾",
        "type": "number",
        "unit": "",
        "placeholder": "4.5"
      },
      {
        "name": "uosm",
        "label": "尿渗透压",
        "type": "number",
        "unit": "",
        "placeholder": "600"
      },
      {
        "name": "posm",
        "label": "血渗透压",
        "type": "number",
        "unit": "",
        "placeholder": "300"
      }
    ],
    "计算结果": "function(v){return Math.round((v.uk/v.pk)/(v.uosm/v.posm)*10)/10;}",
    "计算公式": "(Uk/Pk) ÷ (Uosm/Posm)",
    "公式解读": "评估醛固酮对集合管排钾作用的敏感性。",
    "参考范围": "高钾时应>10，低钾时应<3",
    "健康建议": "function(res, v){ if(v.pk > 5.5 && res < 7) return '高钾伴TTKG偏低，提示肾脏排钾未代偿增加，怀疑醛固酮缺乏或抵抗。'; if(v.pk < 3.5 && res > 4) return '低钾伴TTKG偏高，提示肾脏仍在排钾，多为肾性失钾(如利尿剂、Gitelman综合征)。'; return 'TTKG梯度符合当前血钾状态，肾脏钾调节机制未见明显异常。'; }",
    "category": "肾脏病学",
    "适用人群": "钾代谢异常",
    "临床场景": "高低钾血症鉴别"
  },
  {
    "id": "tnm_pelvis_interactive_fixed",
    "title": "肾盂和输尿管肿瘤 TNM 分期 (UTUC)",
    "version": "8.1",
    "输出": "AJCC 临床分期 (I - IV 期)",
    "输入": [
      {
        "name": "t_stage",
        "label": "1. 原发肿瘤 (T) 浸润深度",
        "type": "radio",
        "options": [
          "Ta: 非浸润性乳头状癌",
          "Tis: 原位癌",
          "T1: 侵犯上皮下结缔组织",
          "T2: 侵犯固有肌层",
          "T3: 侵犯肾周/输尿管周脂肪或肾实质",
          "T4: 侵犯邻近器官或穿过肾周脂肪至 Gerota 筋膜外"
        ]
      },
      {
        "name": "n_stage",
        "label": "2. 区域淋巴结 (N) 状态",
        "type": "radio",
        "options": [
          "N0: 无区域淋巴结转移",
          "N1: 单个区域淋巴结转移且最大径 ≤ 2cm",
          "N2: 单个淋巴结 > 2cm 或 多个淋巴结转移"
        ]
      },
      {
        "name": "m_stage",
        "label": "3. 远处转移 (M)",
        "type": "radio",
        "options": [
          "M0: 无远处转移",
          "M1: 存在远处转移"
        ]
      }
    ],
    "计算结果": "function(v){ if(v.m_stage && v.m_stage.includes('M1')) return 'IV 期 (晚期转移性)'; if(v.t_stage && v.t_stage.includes('T4')) return 'IV 期 (局部晚期)'; if(v.n_stage && (v.n_stage.includes('N1') || v.n_stage.includes('N2'))) return 'IV 期 (淋巴结阳性)'; if(v.t_stage && v.t_stage.includes('T3')) return 'III 期'; if(v.t_stage && v.t_stage.includes('T2')) return 'II 期'; return 'I 期 / 0 期 (早期)'; }",
    "计算公式": "基于 AJCC 第 8 版上尿路尿路上皮癌 (UTUC) 分期标准",
    "公式解读": "决策逻辑：1. Ta/Tis 为 0 期，T1 为 I 期；2. T2 局限于肌层为 II 期；3. T3 突破肌层进入脂肪为 III 期；4. T4 或 N+ 或 M1 均直接定为 IV 期。",
    "参考范围": "适用于肾盂癌及输尿管癌，不适用于肾透明细胞癌",
    "健康建议": "function(res, v){ if(res.includes('IV')){ return '【临床预警】1. 建议行根治性肾输尿管切除术 (RNU) 联合区域淋巴结清扫；2. 评估顺铂为主的全身化疗或免疫治疗方案；3. 晚期预后较差，需多学科讨论。'; } if(res.includes('III')){ return '【手术决策】标准术式为根治性肾输尿管全长切除 + 膀胱袖状切除；术后建议行辅助化疗以降低复发。'; } return '【早期处置】1. 根治性手术是标准治疗；2. 术后必须每 3-6 个月进行膀胱镜检查（尿路上皮癌具有“时空多中心”复发特性）。'; }",
    "category": "肾脏病学",
    "适用人群": "上尿路尿路上皮癌 (UTUC) 患者",
    "clinical_scenario": "术前影像学/内镜分期评估及手术范围规划"
  },
  {
    "id": "maint_fluid",
    "title": "维持液体计算",
    "输出": "mL/h",
    "输入": [
      {
        "name": "wt",
        "label": "体重",
        "type": "number",
        "unit": "kg",
        "placeholder": "60"
      }
    ],
    "计算结果": "function(v){var w=v.wt; return w<=10?w*4:w<=20?40+(w-10)*2:60+(w-20)*1;}",
    "计算公式": "4-2-1法则",
    "公式解读": "禁食期间每小时生理液体的基础消耗量。",
    "参考范围": "按体重累加",
    "健康建议": "function(res, v){ return '基础维持液体需 ' + res + ' mL/h。若患者伴发热(体温每升高1℃加10%)、多汗或消化道引流，需根据实际丢失量额外增加补液。'; }",
    "category": "肾脏病学",
    "适用人群": "禁食患者",
    "临床场景": "补液处方"
  },
  {
    "id": "osmc",
    "title": "血清渗透压(OSMc)",
    "输出": "mOsm/kg",
    "输入": [
      {
        "name": "na",
        "label": "血钠",
        "type": "number",
        "unit": "mmol/L",
        "placeholder": "140"
      },
      {
        "name": "glu",
        "label": "血糖",
        "type": "number",
        "unit": "mmol/L",
        "placeholder": "5.5"
      },
      {
        "name": "bun",
        "label": "BUN",
        "type": "number",
        "unit": "mmol/L",
        "placeholder": "5.0"
      }
    ],
    "计算结果": "function(v){return Math.round(2*v.na+v.glu+v.bun);}",
    "计算公式": "2×Na + Glu + BUN",
    "公式解读": "维持细胞形态和水平衡的物理张力。",
    "参考范围": "275-295 mOsm/kg",
    "健康建议": "function(res, v){ if(res > 320) return '血清渗透压高达 ' + res + ' mOsm/kg，存在高渗危象！极易导致脑细胞脱水昏迷，需尽快查明原因(如高钠或严重高血糖)并在ICU严密干预。'; if(res < 275) return '低渗状态，水分易向细胞内转移引发脑水肿，需警惕神经系统症状。'; return '血清渗透压在正常范围内。'; }",
    "category": "肾脏病学",
    "适用人群": "内分泌及重症",
    "临床场景": "高渗昏迷鉴别"
  },
  {
    "id": "mehran_cin_risk_score",
    "title": "Mehran 造影剂肾病 (CIN) 风险评分",
    "version": "1.0",
    "输出": "CIN 发生率及透析风险预测",
    "输入": [
      {
        "name": "hypotension",
        "label": "1. 低血压 (SBP < 80mmHg 持续至少1小时)",
        "type": "radio",
        "options": [
          {
            "label": "无 (0分)",
            "value": 0
          },
          {
            "label": "有 (5分)",
            "value": 5
          }
        ]
      },
      {
        "name": "iabp",
        "label": "2. 使用主动脉内球囊反搏 (IABP)",
        "type": "radio",
        "options": [
          {
            "label": "无 (0分)",
            "value": 0
          },
          {
            "label": "有 (5分)",
            "value": 5
          }
        ]
      },
      {
        "name": "chf",
        "label": "3. 充血性心力衰竭 (NYHA III/IV级或肺水肿史)",
        "type": "radio",
        "options": [
          {
            "label": "无 (0分)",
            "value": 0
          },
          {
            "label": "有 (5分)",
            "value": 5
          }
        ]
      },
      {
        "name": "age_gt_75",
        "label": "4. 年龄 > 75 岁",
        "type": "radio",
        "options": [
          {
            "label": "否 (0分)",
            "value": 0
          },
          {
            "label": "是 (4分)",
            "value": 4
          }
        ]
      },
      {
        "name": "anemia",
        "label": "5. 贫血 (男 Hct < 39%, 女 Hct < 36%)",
        "type": "radio",
        "options": [
          {
            "label": "否 (0分)",
            "value": 0
          },
          {
            "label": "是 (3分)",
            "value": 3
          }
        ]
      },
      {
        "name": "diabetes",
        "label": "6. 糖尿病",
        "type": "radio",
        "options": [
          {
            "label": "否 (0分)",
            "value": 0
          },
          {
            "label": "是 (3分)",
            "value": 3
          }
        ]
      },
      {
        "name": "contrast_volume",
        "label": "7. 造影剂用量 (每 100ml 计 1 分)",
        "type": "number",
        "placeholder": "如 200ml 输入 2"
      },
      {
        "name": "egfr_level",
        "label": "8. 基础 eGFR (ml/min/1.73m²)",
        "type": "radio",
        "options": [
          {
            "label": "> 60 (0分)",
            "value": 0
          },
          {
            "label": "40 - 60 (2分)",
            "value": 2
          },
          {
            "label": "20 - 40 (4分)",
            "value": 4
          },
          {
            "label": "< 20 (6分)",
            "value": 6
          }
        ]
      }
    ],
    "计算结果": "function(v){ var s = v.hypotension + v.iabp + v.chf + v.age_gt_75 + v.anemia + v.diabetes + v.egfr_level + Math.floor(v.contrast_volume); var cin_prob = ''; var dialysis_prob = ''; if(s <= 5) { cin_prob = '7.5%'; dialysis_prob = '0.04%'; } else if(s <= 10) { cin_prob = '14.0%'; dialysis_prob = '0.12%'; } else if(s <= 15) { cin_prob = '26.1%'; dialysis_prob = '1.09%'; } else { cin_prob = '57.3%'; dialysis_prob = '12.6%'; } return '总分: ' + s + ' | CIN 风险: ' + cin_prob + ' | 透析风险: ' + dialysis_prob; }",
    "计算公式": "Mehran Score 风险累加模型",
    "公式解读": "决策逻辑：1. 10 分是高风险分水岭；2. 16 分以上为极高危，一半以上的患者会发生 AKI；3. 造影剂用量与肾功能损耗呈线性正相关。",
    "参考范围": "适用于冠脉介入 (PCI) 或大型血管造影患者",
    "健康建议": "function(res, v){ if(res.includes('57.3%')){ return '【极高危预警】1. 术前术后强制水化 (生理盐水 1ml/kg/h)；2. 尽量使用等渗或低渗造影剂；3. 严格控制造影剂总量 < 100ml；4. 术后 48-72 小时动态监测肌酐。'; } return '【预防建议】1. 保证充足液体入量；2. 术后密切观察尿量变化；3. 建议术后 2 天复查肾功能。'; }",
    "category": "肾脏病学",
    "适用人群": "准备接受含碘造影剂检查/手术的患者",
    "clinical_scenario": "术前风险分层、预防性水化方案制定、造影剂用量限制参考"
  },
  {
    "id": "meld",
    "title": "终末期肝病模型(12岁及12岁以上)",
    "输出": "MELD分",
    "输入": [
      {
        "name": "tb",
        "label": "胆红素(mg/dL)",
        "type": "number",
        "unit": "",
        "placeholder": "3"
      },
      {
        "name": "inr",
        "label": "INR",
        "type": "number",
        "unit": "",
        "placeholder": "1.5"
      },
      {
        "name": "cr",
        "label": "肌酐(mg/dL)",
        "type": "number",
        "unit": "",
        "placeholder": "1.5"
      }
    ],
    "计算结果": "function(v){return Math.round(9.57*Math.log(v.tb)+3.78*Math.log(v.inr)+11.2*Math.log(v.cr)+6.43);}",
    "计算公式": "对数公式系统综合",
    "公式解读": "肝功能终末期严重度，间接反映肝肾综合征几率。",
    "参考范围": "6-40分",
    "健康建议": "function(res, v){ if(res >= 20) return 'MELD评分高达 ' + res + ' 分，3个月内病死率极高，需紧急评估肝移植指征。'; if(res >= 15) return '病情较重，发生肝肾综合征风险大，需积极预防并发症。'; return '病情相对稳定，定期随访复评。'; }",
    "category": "肾脏病学",
    "适用人群": "肝衰患者",
    "临床场景": "肝肾综合征预后"
  },
  {
    "id": "kpnw_ckd_outcome_fixed",
    "title": "CKD 3-4 期终点预测 (KPNW)",
    "version": "1.1",
    "输出": "5 年内进入 ESRD vs 死亡的概率预测",
    "输入": [
      {
        "name": "age",
        "label": "1. 年龄 (岁)",
        "type": "number",
        "placeholder": "如 65"
      },
      {
        "name": "gender",
        "label": "2. 性别",
        "type": "radio",
        "options": [
          "男",
          "女"
        ]
      },
      {
        "name": "egfr",
        "label": "3. 当前 eGFR (ml/min/1.73m²)",
        "type": "number",
        "placeholder": "范围 15 - 59"
      },
      {
        "name": "diabetes",
        "label": "4. 是否患有糖尿病",
        "type": "radio",
        "options": [
          "否",
          "是"
        ]
      },
      {
        "name": "anemia",
        "label": "5. 是否患有贫血 (Hb < 120g/L)",
        "type": "radio",
        "options": [
          "否",
          "是"
        ]
      },
      {
        "name": "uacr_status",
        "label": "6. 尿白蛋白/肌酐比 (UACR)",
        "type": "radio",
        "options": [
          "正常/微量 (< 30)",
          "中度升高 (30-300)",
          "重度升高 (> 300)"
        ]
      }
    ],
    "计算结果": "function(v){ var esrd = '中高风险'; var death = '中度风险'; var uacr_val = v.uacr_status.includes('> 300')?2:(v.uacr_status.includes('30-300')?1:0); if(v.egfr < 30 && uacr_val === 2) esrd = '极高风险 (5年内 > 50%)'; if(v.age > 75 || v.anemia === '是') death = '极高风险 (竞争死亡风险显著)'; return 'ESRD 进展风险: ' + esrd + ' | 竞争性死亡风险: ' + death; }",
    "计算公式": "基于 Cox 比例风险回归模型的生存分析权重",
    "公式解读": "决策逻辑：1. 低 eGFR + 高蛋白尿 = 透析终点；2. 高龄 + 贫血 + 糖尿病 = 死亡终点；3. KPNW 强调在 CKD 4 期，死亡风险常高于透析风险。",
    "参考范围": "专门针对 eGFR 在 15-60 之间的 CKD 中晚期患者",
    "健康建议": "function(res, v){ if(v.egfr < 20){ return '【终末期准备】1. 启动 RRT 宣教；2. 评估内瘘 (AVF) 建立时机；3. 严控血磷与 iPTH。'; } return '【强化管理】1. 严格控制血压 < 130/80；2. 评估心血管风险；3. 延缓肾功能恶化。'; }",
    "category": "肾脏病学",
    "适用人群": "CKD 3期及4期患者",
    "临床场景": "个体化预后咨询、血液透析通路早期规划参考"
  },
  {
    "id": "anca_rrs_brix_2026_fixed",
    "title": "ANCA 相关性肾炎肾脏风险评分 (Brix)",
    "version": "1.1",
    "输出": "3年内进展为 ESRD 的风险分层",
    "输入": [
      {
        "name": "gfr_status",
        "label": "1. 诊断时基础 eGFR",
        "type": "radio",
        "options": [
          "> 15 (0分)",
          "≤ 15 (5分)"
        ]
      },
      {
        "name": "sclerosis",
        "label": "2. 病理：肾小球硬化比例 (%)",
        "type": "radio",
        "options": [
          "< 10% (0分)",
          "10% - 50% (2分)",
          "> 50% (4分)"
        ]
      },
      {
        "name": "ifta",
        "label": "3. 病理：间质纤维化 (IFTA)",
        "type": "radio",
        "options": [
          "轻度或无 (≤ 25%) (0分)",
          "中重度 (> 25%) (2分)"
        ]
      }
    ],
    "计算结果": "function(v){ var s1 = v.gfr_status.includes('≤ 15')?5:0; var s2 = v.sclerosis.includes('> 50%')?4:(v.sclerosis.includes('10%')?2:0); var s3 = v.ifta.includes('中重度')?2:0; var s = s1 + s2 + s3; var cat = s <= 1 ? '低危 (0%)' : (s <= 7 ? '中危 (26%)' : '高危 (68%)'); return '总分: ' + s + ' | 3年内 ESRD 概率: ' + cat; }",
    "计算公式": "Brix Renal Risk Score = GFR权重 + 硬化权重 + 间质权重",
    "公式解读": "决策逻辑：1. 诊断时 eGFR ≤ 15 是最强预后指标；2. 病理硬化不可逆，直接决定剩余肾寿命。",
    "参考范围": "适用于 ANCA 阳性的坏死性新月体性肾炎",
    "健康建议": "function(res, v){ if(res.includes('高危')){ return '【强化治疗决策】1. 建议足量激素联合 RTX/CTX 诱导缓解；2. 评估血浆置换指征；3. 尽早讨论透析规划。'; } return '【规范治疗】维持当前免疫抑制方案，每 2-4 周复查肾功，警惕感染。'; }",
    "category": "肾脏病学",
    "适用人群": "ANCA 相关性肾炎患者",
    "临床场景": "病理结果解读及预后沟通"
  },
  {
    "id": "ckd_kdigo_cga_fixed",
    "title": "慢性肾脏病 (CKD) CGA 分期系统",
    "version": "2.1",
    "输出": "G 分级、A 分级及风险分层",
    "输入": [
      {
        "name": "egfr",
        "label": "1. eGFR (ml/min/1.73m²)",
        "type": "number",
        "placeholder": "基于 CKD-EPI 2021"
      },
      {
        "name": "acr_status",
        "label": "2. 尿白蛋白/肌酐比 (ACR)",
        "type": "radio",
        "options": [
          "A1: < 30 (正常/轻度)",
          "A2: 30-300 (中度)",
          "A3: > 300 (重度)"
        ]
      },
      {
        "name": "duration_3m",
        "label": "3. 肾损害是否持续 ≥ 3 个月",
        "type": "checkbox"
      }
    ],
    "计算结果": "function(v){ if(!v.duration_3m && v.egfr >= 60) return '未达 CKD 诊断标准 (需病程 > 3个月)'; var g = v.egfr>=90?'G1':(v.egfr>=60?'G2':(v.egfr>=45?'G3a':(v.egfr>=30?'G3b':(v.egfr>=15?'G4':'G5')))); var a = v.acr_status.includes('A1')?'A1':(v.acr_status.includes('A2')?'A2':'A3'); var risk = ''; if(g==='G1'||g==='G2'){ risk = a==='A1'?'低风险':'中高风险'; } else { risk = '极高风险 (红色)'; } return '分期: ' + g + a + ' | 风险等级: ' + risk; }",
    "计算公式": "基于 KDIGO GFR 与白蛋白尿交叉矩阵",
    "公式解读": "决策逻辑：1. G 代表排泄功能；2. A 代表滤过膜损伤；3. 即使 GFR 正常，A2/A3 持续 3 个月也诊断 CKD。",
    "参考范围": "G3b 期（eGFR < 45）是临床加速拐点",
    "健康建议": "function(res, v){ if(res.includes('极高风险')){ return '【极高危路径】1. 每 3 个月复查；2. 严管血压 < 130/80；3. 启动 SGLT2i 或 RASi。'; } return '【常规随访】1. 每年复查 1 次；2. 避开 NSAIDs 等肾毒性药物。'; }",
    "category": "肾脏病学",
    "适用人群": "所有慢性肾脏病患者",
    "临床场景": "CKD 规范化管理"
  },
  {
    "id": "mest_c_v2_fixed",
    "title": "IgAN 牛津病理分型 (MEST-C)",
    "version": "2.0",
    "输出": "病理评分组合",
    "输入": [
      {
        "name": "m",
        "label": "系膜增生 (M)",
        "type": "radio",
        "options": [
          "M0: ≤50% 系膜区增生",
          "M1: >50% 系膜区增生"
        ]
      },
      {
        "name": "e",
        "label": "内皮增生 (E)",
        "type": "radio",
        "options": [
          "E0: 无",
          "E1: 有内皮下增生"
        ]
      },
      {
        "name": "s",
        "label": "节段硬化 (S)",
        "type": "radio",
        "options": [
          "S0: 无",
          "S1: 有节段硬化/粘连"
        ]
      },
      {
        "name": "t",
        "label": "小管萎缩/纤维化 (T)",
        "type": "radio",
        "options": [
          "T0: 0-25%",
          "T1: 26-50%",
          "T2: > 50%"
        ]
      },
      {
        "name": "c",
        "label": "新月体 (C)",
        "type": "radio",
        "options": [
          "C0: 无",
          "C1: < 25%",
          "C2: ≥ 25%"
        ]
      }
    ],
    "计算结果": "function(v){ var m_val = v.m.includes('M1')?1:0; var e_val = v.e.includes('E1')?1:0; var s_val = v.s.includes('S1')?1:0; var t_val = v.t.includes('T2')?2:(v.t.includes('T1')?1:0); var c_val = v.c.includes('C2')?2:(v.c.includes('C1')?1:0); return '病理型: M' + m_val + ' E' + e_val + ' S' + s_val + ' T' + t_val + ' C' + c_val; }",
    "计算公式": "穿刺活检病理计分组合 (Oxford 2017)",
    "公式解读": "预测 IgA 肾病的远期肾存活率。T 和 C 是最重要的预后指标。",
    "参考范围": "T1/2 或 C1/2 提示预后不佳，需积极干预",
    "健康建议": "function(res, v){ if(v.c.includes('C1') || v.c.includes('C2')) return '【预警】发现新月体(C>0)，提示急性炎症活跃，是启动激素或免疫抑制治疗的强烈指征。'; if(v.t.includes('T1') || v.t.includes('T2')) return '【预警】存在明显肾小管萎缩(T>0)，提示慢性不可逆损伤，应以延缓进展为核心。'; return '【评估】病理改变较轻，控制血压及 RAAS 阻断剂效果通常良好。'; }",
    "category": "肾脏病学",
    "适用人群": "IgA 肾病活检者",
    "临床场景": "肾活检病理报告解读"
  },
  {
    "id": "ktv_multi",
    "title": "血液透析(Kt/V)计算公式(多种方法)",
    "输出": "Kt/V",
    "输入": [
      {
        "name": "r",
        "label": "透后/透前BUN比值",
        "type": "number",
        "unit": "",
        "placeholder": "0.3"
      },
      {
        "name": "t",
        "label": "时长(h)",
        "type": "number",
        "unit": "",
        "placeholder": "4"
      },
      {
        "name": "uf",
        "label": "脱水(L)",
        "type": "number",
        "unit": "",
        "placeholder": "2.5"
      },
      {
        "name": "w",
        "label": "干体重",
        "type": "number",
        "unit": "",
        "placeholder": "60"
      }
    ],
    "计算结果": "function(v){return Math.round((-Math.log(v.r-0.008*v.t)+(4-3.5*v.r)*v.uf/v.w)*100)/100;}",
    "计算公式": "Daugirdas 2代公式",
    "公式解读": "衡量单次血液透析的小分子毒素清除率的最标准方法。",
    "参考范围": "≥1.2",
    "健康建议": "function(res, v){ if(res < 1.2) return 'Kt/V = ' + res + '。透析严重不充分，远期并发症死亡率极高！需排查内瘘血流是否不足或考虑延长透析时间。'; if(res > 1.6) return 'Kt/V = ' + res + '。透析效能极佳，毒素清除彻底，预后良好。'; return 'Kt/V达标，请维持当前透析处方。'; }",
    "category": "肾脏病学",
    "适用人群": "HD透析患者",
    "临床场景": "透析充分性评估"
  },
  {
    "id": "ktv_no_time",
    "title": "血液透析(Kt/V)计算公式(不含透析时长)",
    "输出": "Kt/V(简化)",
    "输入": [
      {
        "name": "r",
        "label": "透后/透前BUN比值",
        "type": "number",
        "unit": "",
        "placeholder": "0.3"
      }
    ],
    "计算结果": "function(v){return Math.round(-Math.log(v.r)*100)/100;}",
    "计算公式": "-ln(R)",
    "公式解读": "最粗略的毒素下降对数评估法。",
    "参考范围": "≥1.2",
    "健康建议": "function(res, v){ return '估测 Kt/V 为 ' + res + '。注意：简化公式常高估实际清除率，仅在缺乏参数时作急诊粗略参考，不能代替Daugirdas标准模型。'; }",
    "category": "肾脏病学",
    "适用人群": "HD透析患者",
    "临床场景": "极简快速评估"
  },
  {
    "id": "ktv_pd",
    "title": "腹膜透析(Kt/V)计算公式",
    "输出": "每周Kt/V",
    "输入": [
      {
        "name": "d",
        "label": "每日腹透液尿素量",
        "type": "number",
        "unit": "mmol",
        "placeholder": "200"
      },
      {
        "name": "p",
        "label": "血尿素浓度",
        "type": "number",
        "unit": "mmol/L",
        "placeholder": "20"
      },
      {
        "name": "v",
        "label": "尿素分布容积",
        "type": "number",
        "unit": "L",
        "placeholder": "35"
      }
    ],
    "计算结果": "function(v){return Math.round((v.d/v.p)*7/v.v *100)/100;}",
    "计算公式": "(D/P) × 7天 ÷ V",
    "公式解读": "衡量腹膜透析患者一周内的总毒素清除率。",
    "参考范围": "目标≥1.7",
    "健康建议": "function(res, v){ if(res < 1.7) return '每周Kt/V为 ' + res + '。透析剂量不达标，建议增加每日换液袋数、提升透析液渗透压，或积极保护残余尿量。'; return '每周Kt/V达标，请继续保持现有的规范无菌换液操作。'; }",
    "category": "肾脏病学",
    "适用人群": "CAPD患者",
    "临床场景": "腹透处方制定"
  },
  {
    "id": "ktv_time",
    "title": "血液透析(Kt/V)计算公式(含透析时长)",
    "输出": "Kt/V",
    "输入": [
      {
        "name": "k",
        "label": "透析器尿素清除率",
        "type": "number",
        "unit": "mL/min",
        "placeholder": "250"
      },
      {
        "name": "t",
        "label": "时长",
        "type": "number",
        "unit": "h",
        "placeholder": "4"
      },
      {
        "name": "v",
        "label": "分布容积",
        "type": "number",
        "unit": "L",
        "placeholder": "35"
      }
    ],
    "计算结果": "function(v){return Math.round((v.k*v.t*60)/(v.v*1000)*100)/100;}",
    "计算公式": "K×t/V理论物理法",
    "公式解读": "通过透析器体外说明书参数直接推导理论清除量。",
    "参考范围": "≥1.2",
    "健康建议": "function(res, v){ if(res < 1.2) return '理论Kt/V评估为 ' + res + '。提示该透析处方可能无法达到充分的毒素清除效果，建议在开具处方时上调血流量或延长透析时间。'; return '理论Kt/V达标，可作为初始透析处方参考。'; }",
    "category": "肾脏病学",
    "适用人群": "HD透析患者",
    "临床场景": "上机前理论处方预估"
  },
  {
    "id": "b2m_clr",
    "title": "β2微球蛋白清除率",
    "输出": "下降率(%)",
    "输入": [
      {
        "name": "pre",
        "label": "透前β2M",
        "type": "number",
        "unit": "mg/L",
        "placeholder": "40"
      },
      {
        "name": "post",
        "label": "透后β2M",
        "type": "number",
        "unit": "mg/L",
        "placeholder": "15"
      }
    ],
    "计算结果": "function(v){return Math.round((v.pre-v.post)/v.pre*100);}",
    "计算公式": "(透前-透后)/透前×100%",
    "公式解读": "衡量透析膜对中大分子毒素（引起淀粉样变的原因）的清除效能。",
    "参考范围": "血滤(HDF)常>60%",
    "健康建议": "function(res, v){ if(res < 60) return '清除率偏低(' + res + '%)，提示中大分子毒素清除欠佳，长期易并发透析相关淀粉样变(如腕管综合征)。建议更换高通量透析器或增加血液滤过频次。'; return '清除率良好，高通量透析效能佳。'; }",
    "category": "肾脏病学",
    "适用人群": "维持性透析患者",
    "临床场景": "高通量透析效能评价"
  },
  {
    "id": "adult_pro_intake_fixed",
    "title": "肾病成人患者每日蛋白质摄入量 (KPI)",
    "version": "2.1",
    "输出": "建议每日总蛋白质摄入量 (g/d)",
    "输入": [
      {
        "name": "weight",
        "label": "1. 理想体重 (kg)",
        "type": "number",
        "placeholder": "基于标准 BMI 计算"
      },
      {
        "name": "dialysis_status",
        "label": "2. 患者当前治疗状态",
        "type": "radio",
        "options": [
          "非透析期 (CKD 3-5期)",
          "血液透析/腹膜透析期"
        ]
      }
    ],
    "计算结果": "function(v){ var min_p = 0; var max_p = 0; if(v.dialysis_status.includes('非透析')){ min_p = v.weight * 0.6; max_p = v.weight * 0.8; } else { min_p = v.weight * 1.0; max_p = v.weight * 1.2; } return min_p.toFixed(1) + ' ~ ' + max_p.toFixed(1) + ' g/d'; }",
    "计算公式": "非透析期 0.6-0.8 g/kg/d；透析期 1.0-1.2 g/kg/d",
    "公式解读": "决策逻辑：1. 非透析期通过低蛋白饮食减轻肾小球高滤过及氮质血症；2. 透析期由于透析液丢失大量氨基酸，需转为高蛋白饮食。",
    "参考范围": "优质蛋白质 (蛋/奶/瘦肉) 应占总摄入量的 50% 以上",
    "健康建议": "function(res, v){ if(v.dialysis_status.includes('非透析')){ return '【营养处方】建议每日摄入 ' + res + '。必须严格执行优质低蛋白饮食，建议配合复方 α-酮酸，既能利用含氮废物转为氨基酸，又能延缓肾衰进展。'; } return '【营养处方】建议每日摄入 ' + res + '。透析患者切忌盲目节食，需保证足够蛋白摄入以预防蛋白质-能量消耗 (PEW) 综合征。'; }",
    "category": "肾脏病学",
    "适用人群": "CKD 3-5 期及终末期透析患者",
    "临床场景": "临床营养师膳食处方制定"
  },
  {
    "id": "pcr_nna_calc_fixed",
    "title": "蛋白分解率 (PCR) 计算公式 (含 NUN 校正)",
    "version": "2.0",
    "输出": "每日蛋白实际分解总量 (g/d)",
    "输入": [
      {
        "name": "uun_24h",
        "label": "1. 24小时尿尿素氮 (UUN, g/d)",
        "type": "number",
        "placeholder": "由 24h 尿样测得"
      },
      {
        "name": "nun_loss",
        "label": "2. 非尿素氮丢失 (NUN) 程度",
        "type": "radio",
        "options": [
          "标准丢失 (固定值 31 mg/kg/d)",
          "应激状态 (高热/创伤/大手术)"
        ]
      },
      {
        "name": "weight",
        "label": "3. 患者体重 (kg)",
        "type": "number"
      }
    ],
    "计算结果": "function(v){ var nun = v.nun_loss.includes('标准') ? (v.weight * 0.031) : (v.weight * 0.05); var pcr = (v.uun_24h + nun) * 6.25; return pcr.toFixed(1) + ' g/d'; }",
    "计算公式": "PCR = (UUN + NUN丢失) × 6.25",
    "公式解读": "逻辑死磕：1. 氮平衡原理推导；2. NUN 包括粪氮、皮肤氮丢失及非尿素氮排泄；3. UUN 与 PCR 差值较大提示氮平衡失调。",
    "参考范围": "氮平衡状态下，PCR 应接近患者的实际蛋白质摄入量 (DPI)",
    "健康建议": "function(res, v){ var val = parseFloat(res); return '测得患者实际蛋白分解量为 ' + res + '。临床意义：1. 若该值远大于摄入量，提示机体处于高分解状态；2. 可用于核查患者自我报告饮食量的真实依从性。'; }",
    "category": "肾脏病学",
    "适用人群": "需精确评估氮平衡与营养消耗的患者",
    "临床场景": "代谢实验室或肾内科病房精细化管理"
  },
  {
    "id": "npcr",
    "title": "标准化蛋白分解率(nPCR)计算公式",
    "输出": "nPCR (g/kg/d)",
    "输入": [
      {
        "name": "pcr",
        "label": "前算得的PCR",
        "type": "number",
        "unit": "g",
        "placeholder": "60"
      },
      {
        "name": "wt",
        "label": "标准体重",
        "type": "number",
        "unit": "kg",
        "placeholder": "60"
      }
    ],
    "计算结果": "function(v){return Math.round(v.pcr/v.wt*100)/100;}",
    "计算公式": "PCR / 体重",
    "公式解读": "将蛋白分解率平均到公斤体重，消除个体体型差异。",
    "参考范围": "透析患者维持在 1.0-1.2 最佳",
    "健康建议": "function(res, v){ if(res < 1.0) return 'nPCR偏低(' + res + ')，提示蛋白质摄入不足或存在重度营养不良风险，需强化肠内营养支持。'; if(res > 1.2) return 'nPCR偏高，提示机体处于高分解代谢状态或近期蛋白质摄入过多。'; return 'nPCR处于理想平衡区间。'; }",
    "category": "肾脏病学",
    "适用人群": "维持透析患者",
    "临床场景": "透析充分性与营养监控"
  },
  {
    "id": "pd_peritonitis_failure_score",
    "title": "腹膜透析腹膜炎治疗失败风险评估",
    "version": "1.0",
    "输出": "治疗失败（需拔管或导致死亡）的概率预测",
    "输入": [
      {
        "name": "age",
        "label": "1. 年龄",
        "type": "radio",
        "options": [
          {
            "label": "< 60 岁 (0分)",
            "value": 0
          },
          {
            "label": "≥ 60 岁 (1分)",
            "value": 1
          }
        ]
      },
      {
        "name": "pathogen",
        "label": "2. 致病菌类型 (核心指标)",
        "type": "radio",
        "options": [
          {
            "label": "革兰氏阳性菌 (0分)",
            "value": 0
          },
          {
            "label": "革兰氏阴性菌 (含绿脓杆菌) (2分)",
            "value": 2
          },
          {
            "label": "真菌或多种菌混合感染 (4分)",
            "value": 4
          }
        ]
      },
      {
        "name": "effluent_wbc_3d",
        "label": "3. 治疗第 3 天透析流出液 WBC",
        "type": "radio",
        "options": [
          {
            "label": "< 100 /μL (0分)",
            "value": 0
          },
          {
            "label": "100 - 1000 /μL (2分)",
            "value": 2
          },
          {
            "label": "> 1000 /μL (4分)",
            "value": 4
          }
        ]
      },
      {
        "name": "albumin",
        "label": "4. 血清白蛋白水平",
        "type": "radio",
        "options": [
          {
            "label": "≥ 30 g/L (0分)",
            "value": 0
          },
          {
            "label": "< 30 g/L (1分)",
            "value": 1
          }
        ]
      }
    ],
    "计算结果": "function(v){ var s = v.age + v.pathogen + v.effluent_wbc_3d + v.albumin; var risk = ''; if(s >= 7) risk = '极高危 (失败率 > 80%，建议尽早拔管)'; else if(s >= 4) risk = '高危 (失败率约 40-60%)'; else risk = '低中危 (坚持规范抗感染治疗)'; return '总分: ' + s + ' | 预后分层: ' + risk; }",
    "计算公式": "基于 ISPD 2022 更新指南的难治性腹膜炎预测逻辑",
    "公式解读": "决策逻辑：1. 第 3 天的流出液细胞计数是“金标准”；2. 真菌性腹膜炎必须直接拔管，分值直接封顶；3. 营养不良（低蛋白）显著降低清除感染的能力。",
    "参考范围": "治疗 5 天后流出液仍不转清者，定义为难治性腹膜炎",
    "临床建议": "function(res, v){ if(res.includes('极高危') || v.pathogen === 4){ return '【外科决策】1. 立即评估拔除腹透管；2. 转为临时血液透析；3. 升级抗生素（根据药敏）；4. 防止演变为硬化性包囊性腹膜炎 (EPS)。'; } return '【治疗方案】1. 继续腹腔内抗生素给药；2. 监测流出液细胞计数变化；3. 保护腹膜功能。'; }",
    "category": "肾脏病学",
    "适用人群": "正在接受腹膜透析且发生腹膜炎的患者",
    "clinical_scenario": "判定难治性腹膜炎、拔管时机分流、透析方式切换参考"
  },
  {
    "id": "urea_bun",
    "title": "尿素与血尿素氮换算",
    "输出": "换算值",
    "输入": [
      {
        "name": "val",
        "label": "数值",
        "type": "number",
        "unit": "",
        "placeholder": "10"
      },
      {
        "name": "dir",
        "label": "1:BUN->Urea 2:反之",
        "type": "number",
        "unit": "",
        "placeholder": "1"
      }
    ],
    "计算结果": "function(v){return v.dir===1?(v.val*2.14).toFixed(1)+' mmol/L Urea':(v.val/2.14).toFixed(1)+' mg/dL BUN';}",
    "计算公式": "Urea = BUN(mg/dL) × 2.14",
    "公式解读": "统一检验单上因氮原子质量占比造成的数值差异。",
    "参考范围": "BUN正常7-20 mg/dL",
    "健康建议": "function(res, v){ return '换算完成。临床及科研中需注意区分BUN与Urea单位，避免在测算Kt/V或应用KDIGO指南时发生严重的数量级误差。'; }",
    "category": "肾脏病学",
    "适用人群": "常规医学评估人群",
    "临床场景": "外院化验单对齐与数据转换"
  },
  {
    "id": "ca_p_product_standard_fixed",
    "title": "钙磷乘积 (Ca × P) 计算器",
    "version": "2.1",
    "输出": "钙磷乘积值及血管钙化风险评估",
    "输入": [
      {
        "name": "ca_val",
        "label": "1. 血钙浓度",
        "type": "number",
        "placeholder": "请输入数值"
      },
      {
        "name": "p_val",
        "label": "2. 血磷浓度",
        "type": "number",
        "placeholder": "请输入数值"
      },
      {
        "name": "unit_type",
        "label": "3. 选择输入单位",
        "type": "radio",
        "options": [
          "mmol/L (国际单位)",
          "mg/dL (常用单位)"
        ]
      }
    ],
    "计算结果": "function(v){ if(!v.ca_val || !v.p_val || !v.unit_type) return '等待输入...'; var prod = v.ca_val * v.p_val; var isMmol = v.unit_type.includes('mmol'); var threshold = isMmol ? 4.4 : 55; var unitStr = isMmol ? ' mmol²/L²' : ' mg²/dL²'; var status = prod > threshold ? '【预警】升高' : '正常'; return '计算值: ' + prod.toFixed(2) + unitStr + ' | 状态: ' + status; }",
    "计算公式": "Ca × P (根据输入单位自动对标 4.4 或 55 的阈值)",
    "公式解读": "逻辑死磕：1. 若单位为 mmol/L，临床警戒线为 4.4；2. 若单位为 mg/dL，临床警戒线为 55；3. 乘积升高与透析患者的血管钙化及异位钙化密切相关。",
    "参考范围": "目标值应控制在 55 mg²/dL² (或 4.4 mmol²/L²) 以下",
    "健康建议": "function(res, v){ if(res.includes('预警')){ return '【高危提示】钙磷乘积过高！1. 存在极高的血管硬化及软组织钙化风险；2. 建议严格限制高磷饮食；3. 咨询医生调整磷结合剂或维生素 D 制剂的使用。'; } return '【管理建议】当前钙磷乘积控制良好，请继续保持低磷饮食并定期复查。'; }",
    "category": "肾脏病学",
    "适用人群": "慢性肾脏病 (CKD) 3-5 期及透析患者",
    "clinical_scenario": "肾性骨病 (CKD-MBD) 风险评估与血管钙化预警"
  },
  {
    "id": "watson",
    "title": "总液量计算公式(Watson公式)",
    "输出": "TBW(L)",
    "输入": [
      {
        "name": "age",
        "label": "年龄",
        "type": "number",
        "unit": "",
        "placeholder": "50"
      },
      {
        "name": "ht",
        "label": "身高(cm)",
        "type": "number",
        "unit": "",
        "placeholder": "170"
      },
      {
        "name": "wt",
        "label": "体重(kg)",
        "type": "number",
        "unit": "",
        "placeholder": "65"
      },
      {
        "name": "gen",
        "label": "女=0 男=1",
        "type": "number",
        "unit": "",
        "placeholder": "1"
      }
    ],
    "计算结果": "function(v){return v.gen===1?Math.round(2.447-0.09156*v.age+0.1074*v.ht+0.3362*v.wt):Math.round(-2.097+0.1069*v.ht+0.2466*v.wt);}",
    "计算公式": "多因素非线性回归",
    "公式解读": "目前评估人体总体水最精准的公式，比简单的体重×0.6更好。",
    "参考范围": "男性约35-45L",
    "健康建议": "function(res, v){ return '估算机体总体水容积为 ' + res + ' L。此数值是精确计算透析充分性(Kt/V)极其核心的分母参数(V)。'; }",
    "category": "肾脏病学",
    "适用人群": "成年透析患者",
    "临床场景": "透析机基础参数设定"
  },
  {
    "id": "ckd_risk_heat_map_2026",
    "title": "慢性肾脏病预后危险分层 (KDIGO)",
    "version": "2.1",
    "输出": "KDIGO 风险分层 (绿/黄/橙/红)",
    "输入": [
      {
        "name": "g_stage",
        "label": "1. eGFR 分期 (G1-G5)",
        "type": "radio",
        "options": [
          "G1: ≥ 90 (正常或高)",
          "G2: 60 - 89 (轻度下降)",
          "G3a: 45 - 59 (轻到中度下降)",
          "G3b: 30 - 44 (中到重度下降)",
          "G4: 15 - 29 (重度下降)",
          "G5: < 15 (肾衰竭)"
        ]
      },
      {
        "name": "a_stage",
        "label": "2. 白蛋白尿分期 (A1-A3)",
        "type": "radio",
        "options": [
          "A1: < 30 mg/g (正常或轻度增加)",
          "A2: 30 - 300 mg/g (中度增加)",
          "A3: > 300 mg/g (重度增加)"
        ]
      }
    ],
    "计算结果": "function(v){ if(!v.g_stage || !v.a_stage) return '等待选择...'; var g = v.g_stage.split(':')[0]; var a = v.a_stage.split(':')[0]; var risk = ''; if(g === 'G1' || g === 'G2'){ if(a === 'A1') risk = '低风险 (绿色)'; else if(a === 'A2') risk = '中度风险 (黄色)'; else risk = '高风险 (橙色)'; } else if(g === 'G3a'){ if(a === 'A1') risk = '中度风险 (黄色)'; else if(a === 'A2') risk = '高风险 (橙色)'; else risk = '极高风险 (红色)'; } else if(g === 'G3b'){ if(a === 'A1') risk = '高风险 (橙色)'; else risk = '极高风险 (红色)'; } else { risk = '极高风险 (红色)'; } return '风险等级: ' + risk; }",
    "计算公式": "基于 KDIGO 肾脏病进展与心血管死亡风险矩阵",
    "公式解读": "决策逻辑：1. G 分级代表肾小球滤过功能下降程度；2. A 分级代表肾小球滤过膜受损程度；3. 两者交叉定位后的颜色代表进展至尿毒症、急性肾损伤及心血管死亡的综合风险。",
    "参考范围": "绿色: 低危; 黄色: 中危; 橙色: 高危; 红色: 极高危",
    "健康建议": "function(res, v){ if(res.includes('红色')){ return '【极高危预警】1. 需由肾内科专科医生强化管理；2. 每 3 个月监测肾功与尿蛋白；3. 严格控制血压 < 130/80 mmHg；4. 启动 SGLT2i 或 RAS 阻断剂治疗；5. 准备透析前期宣教。'; } if(res.includes('橙色')){ return '【高危管理】1. 每年至少复查 3 次；2. 严格管理心血管风险因素（血脂、血糖）；3. 评估是否存在贫血或钙磷代谢紊乱。'; } return '【常规随访】1. 每年至少复查 1 次；2. 维持低盐饮食；3. 避免使用肾毒性药物（如非甾体抗炎药）。'; }",
    "category": "肾脏病学",
    "适用人群": "所有慢性肾脏病 (CKD) 患者",
    "clinical_scenario": "整体预后评估、治疗强度分级、多学科面谈参考"
  },
  {
    "id": "ckd_pro_grade",
    "title": "慢性肾脏病的蛋白尿分级",
    "输出": "等级",
    "输入": [
      {
        "name": "uacr",
        "label": "UACR(mg/g)",
        "type": "number",
        "unit": "",
        "placeholder": "150"
      }
    ],
    "计算结果": "function(v){return v.uacr<30?'A1(正常/轻度)':v.uacr<=300?'A2(中度/微量)':'A3(重度/大量)';}",
    "计算公式": "30与300两大界限",
    "公式解读": "蛋白尿不仅是肾损标志，更是内皮损伤和心血管事件的独立加速器。",
    "参考范围": "A1/A2/A3",
    "健康建议": "function(res, v){ if(res.includes('A3')) return '大量白蛋白尿，肾衰竭进展速度极快，强烈建议加用ACEI/ARB或SGLT2i以强效护肾。'; if(res.includes('A2')) return '微量白蛋白尿，处于完全可逆转的黄金治疗窗口期，需立即严格控制代谢指标。'; return '尿蛋白处于生理安全范围。'; }",
    "category": "肾脏病学",
    "适用人群": "糖尿病及高血压患者",
    "临床场景": "检验报告释义"
  },
  {
    "id": "cockcroft_gault_2026_full_fixed",
    "title": "Cockcroft-Gault 估算肌酐清除率 (eCCr)",
    "version": "2.1",
    "输出": "估算肌酐清除率 (eCCr, ml/min)",
    "输入": [
      {
        "name": "age",
        "label": "1. 年龄 (岁)",
        "type": "number",
        "placeholder": "请输入实际周岁"
      },
      {
        "name": "weight",
        "label": "2. 实际体重 (kg)",
        "type": "number",
        "placeholder": "若极度肥胖建议使用理想体重"
      },
      {
        "name": "scr",
        "label": "3. 血肌酐 (μmol/L)",
        "type": "number",
        "placeholder": "测量值"
      },
      {
        "name": "gender_status",
        "label": "4. 性别 (核心校正项)",
        "type": "radio",
        "options": [
          "男 (系数 1.0)",
          "女 (系数 0.85)"
        ]
      }
    ],
    "计算结果": "function(v){ if(!v.age || !v.weight || !v.scr || !v.gender_status) return '等待输入完整参数...'; var raw_ccr = ((140 - v.age) * v.weight) / (0.818 * v.scr); if(v.gender_status.includes('女')) raw_ccr *= 0.85; return 'eCCr: ' + raw_ccr.toFixed(2) + ' ml/min'; }",
    "计算公式": "eCCr = [(140 - 年龄) × 体重(kg)] / [0.818 × Scr(μmol/L)] (女性 × 0.85)",
    "公式解读": "决策逻辑：1. 它是评估肾脏排泄药物能力的最经典公式；2. 女性由于肌肉量相对较少，必须乘以 0.85 的系数进行下调；3. 与 eGFR 不同，eCCr 直接受体重影响，更适合计算药物载荷。",
    "参考范围": "正常值通常 > 90 ml/min；< 60 ml/min 需启动药物剂量调整",
    "健康建议": "function(res, v){ var val = parseFloat(res.split(': ')[1]); if(val < 30){ return '【重度损害】1. 多数经肾排泄药物（如二甲双胍、利伐沙班）需停用或显著减量；2. 避免使用非甾体抗炎药 (NSAIDs)；3. 咨询药剂师获取精准剂量方案。'; } if(val < 60){ return '【中度损害】请检查当前处方中需按肾功能调整剂量的药物（如某些抗生素、抗凝药）；保持充足水分摄入。'; } return '【功能良好】当前估算肌酐清除率处于正常或轻度下降范围。'; }",
    "category": "肾脏病学",
    "适用人群": "需调整药物剂量的成人患者 (不适用于 18 岁以下儿童)",
    "clinical_scenario": "抗生素/抗凝药/化疗药剂量调整、肾损害程度初步评估"
  },
  {
    "id": "upcr",
    "title": "尿蛋白/尿肌酐比值(PCR)",
    "输出": "UPCR(mg/g)",
    "输入": [
      {
        "name": "upro",
        "label": "尿总蛋白(mg/L)",
        "type": "number",
        "unit": "",
        "placeholder": "500"
      },
      {
        "name": "ucr",
        "label": "尿肌酐(g/L)",
        "type": "number",
        "unit": "",
        "placeholder": "1.0"
      }
    ],
    "计算结果": "function(v){return Math.round(v.upro/v.ucr);}",
    "计算公式": "尿总蛋白 / 尿肌酐",
    "公式解读": "包含白蛋白与非白蛋白漏出的整体滤过孔径受损评估。",
    "参考范围": "<150 mg/g",
    "健康建议": "function(res, v){ if(res > 1000) return 'UPCR极高，提示明显的肾实质损伤甚至肾病综合征，需结合临床考虑肾穿刺活检。'; return '可作为替代24h尿蛋白定量的门诊快速评估指标，长期随访价值高。'; }",
    "category": "肾脏病学",
    "适用人群": "可疑肾炎及水肿患者",
    "临床场景": "尿液生化深度分析"
  },
  {
    "id": "uacr_std",
    "title": "尿白蛋白/尿肌酐比值(UACR)",
    "输出": "UACR(mg/g)",
    "输入": [
      {
        "name": "ualb",
        "label": "微量白蛋白(mg/L)",
        "type": "number",
        "unit": "",
        "placeholder": "50"
      },
      {
        "name": "ucr",
        "label": "尿肌酐(g/L)",
        "type": "number",
        "unit": "",
        "placeholder": "1.0"
      }
    ],
    "计算结果": "function(v){return Math.round(v.ualb/v.ucr);}",
    "计算公式": "尿白蛋白 / 尿肌酐",
    "公式解读": "专门针对滤过膜电荷屏障的敏感指标，对早期糖尿病肾病价值极高。",
    "参考范围": "<30 mg/g",
    "健康建议": "function(res, v){ if(res > 300) return '大量白蛋白尿，说明已进入不可逆的临床期肾病，多学科延缓衰竭为主要目标。'; if(res > 30) return '微量白蛋白尿，是内皮细胞损伤和早期微血管病变的吹哨人。'; return '排泄处于正常生理基线内。'; }",
    "category": "肾脏病学",
    "适用人群": "糖网病及长病程高血压筛查",
    "临床场景": "内分泌及微循环早筛"
  },
  {
    "id": "aki_index",
    "title": "肾前性AKI和急性肾小管损伤的尿液诊断指数",
    "输出": "鉴别指数",
    "输入": [
      {
        "name": "fena",
        "label": "FENa(%)",
        "type": "number",
        "unit": "",
        "placeholder": "0.5"
      },
      {
        "name": "uosm",
        "label": "尿渗透压",
        "type": "number",
        "unit": "",
        "placeholder": "600"
      }
    ],
    "计算结果": "function(v){return v.fena<1&&v.uosm>500?'肾前性缺血':'肾小管实质坏死(ATN)';}",
    "计算公式": "综合FENa, 渗透压",
    "公式解读": "联合多项尿液物理化学指标，确诊少尿是否为器质性损伤。",
    "参考范围": "依据组合面板",
    "健康建议": "function(res, v){ if(res.includes('肾前性')) return '诊断倾向于肾前性因素，需在心功能评估允许下积极进行扩容补液。'; return '高度提示可能发生器质性肾小管坏死(ATN)，严禁盲目输液，以免诱发急性肺水肿。'; }",
    "category": "肾脏病学",
    "适用人群": "少尿、无尿及急性肾衰者",
    "临床场景": "肾功能骤降急会诊"
  },
  {
    "id": "trp",
    "title": "肾小管磷重吸收率",
    "输出": "TRP(%)",
    "输入": [
      {
        "name": "up",
        "label": "尿磷",
        "type": "number",
        "unit": "",
        "placeholder": "15"
      },
      {
        "name": "pcr",
        "label": "血肌酐",
        "type": "number",
        "unit": "",
        "placeholder": "90"
      },
      {
        "name": "pp",
        "label": "血磷",
        "type": "number",
        "unit": "",
        "placeholder": "1.2"
      },
      {
        "name": "ucr",
        "label": "尿肌酐",
        "type": "number",
        "unit": "",
        "placeholder": "8000"
      }
    ],
    "计算结果": "function(v){return Math.round((1-(v.up*v.pcr)/(v.pp*v.ucr))*100);}",
    "计算公式": "1 - 磷清除率/肌酐清除率",
    "公式解读": "评估甲状旁腺激素(PTH)对肾小管排磷功能的控制。",
    "参考范围": "85-95%",
    "健康建议": "function(res, v){ if(res < 85) return 'TRP下降，提示肾小管排磷异常增加，若患者伴发高血钙，强烈支持原发性甲状旁腺功能亢进的诊断。'; return '近端肾小管磷重吸收比例正常。'; }",
    "category": "肾脏病学",
    "适用人群": "低磷及高钙血症鉴别者",
    "临床场景": "甲状旁腺疾病鉴别诊断"
  },
  {
    "id": "hyperk_risk_china_2026_fixed",
    "title": "中国慢性肾病高钾血症风险预测模型",
    "version": "2.1",
    "输出": "高钾血症发病风险分层",
    "输入": [
      {
        "name": "egfr_stage",
        "label": "1. 肾功能 (eGFR) 分期",
        "type": "radio",
        "options": [
          "G1-G2: ≥ 60 (0分)",
          "G3a: 45 - 59 (1分)",
          "G3b: 30 - 44 (2分)",
          "G4-G5: < 30 (3分)"
        ]
      },
      {
        "name": "raasi_use",
        "label": "2. RAAS 抑制剂 (ACEI/ARB) 使用",
        "type": "radio",
        "options": [
          "未使用 (0分)",
          "使用中 (2分)"
        ]
      },
      {
        "name": "mra_use",
        "label": "3. 醛固酮受体拮抗剂 (MRA) 使用",
        "type": "radio",
        "options": [
          "未使用 (0分)",
          "使用中 (如螺内酯/非奈利酮) (2分)"
        ]
      },
      {
        "name": "diabetes_status",
        "label": "4. 是否合并糖尿病",
        "type": "radio",
        "options": [
          "否 (0分)",
          "是 (1分)"
        ]
      },
      {
        "name": "diuretic_status",
        "label": "5. 襻利尿剂使用情况",
        "type": "radio",
        "options": [
          "使用中 (对冲风险, 0分)",
          "未使用 (风险暴露, 1分)"
        ]
      }
    ],
    "计算结果": "function(v){ var s = 0; if(v.egfr_stage) s += v.egfr_stage.includes('G4')?3:(v.egfr_stage.includes('G3b')?2:(v.egfr_stage.includes('G3a')?1:0)); if(v.raasi_use) s += v.raasi_use.includes('使用中')?2:0; if(v.mra_use) s += v.mra_use.includes('使用中')?2:0; if(v.diabetes_status) s += v.diabetes_status.includes('是')?1:0; if(v.diuretic_status) s += v.diuretic_status.includes('未使用')?1:0; var risk = s >= 6 ? '极高风险' : (s >= 3 ? '中高风险' : '低风险'); return '总评分: ' + s + ' | 风险分层: ' + risk; }",
    "计算公式": "基于中国 CKD 2022 队列研究的加权赋分模型",
    "公式解读": "决策逻辑：1. eGFR < 30 是高钾的最强预测因子；2. RAASi 与 MRA 联用具有叠加升钾风险；3. 糖尿病患者存在低肾素低醛固酮血症，风险更高；4. 缺少利尿剂对冲时，风险增加。",
    "参考范围": "评分 ≥ 6 分提示近期发生致死性高钾血症风险显著升高",
    "健康建议": "function(res, v){ if(res.includes('极高')){ return '【高危预警】1. 慎用或禁用保钾利尿剂及双倍剂量 RAASi；2. 建议处方备好新型钾离子交换树脂 (如环硅酸锆钠)；3. 严格限制高钾饮食(如香蕉、橙子、低钠盐)；4. 每 2-4 周复查血钾。'; } if(res.includes('中高')){ return '【动态监测】1. 启动 RAASi 时需在 1-2 周内复查血钾；2. 关注心电图 T 波变化。'; } return '【常规观察】血钾风险目前处于可控范围，建议每 3-6 个月随访。'; }",
    "category": "肾脏病学",
    "适用人群": "中国 CKD 3-5 期非透析患者",
    "clinical_scenario": "心内科与肾内科联合用药审查、高钾血症筛查"
  },
  {
    "id": "urr",
    "title": "URR尿素下降率",
    "输出": "URR(%)",
    "输入": [
      {
        "name": "pre",
        "label": "透前尿素",
        "type": "number",
        "unit": "",
        "placeholder": "25"
      },
      {
        "name": "post",
        "label": "透后尿素",
        "type": "number",
        "unit": "",
        "placeholder": "8"
      }
    ],
    "计算结果": "function(v){return Math.round((v.pre-v.post)/v.pre*100);}",
    "计算公式": "(透前-透后) / 透前 × 100%",
    "公式解读": "最直观反映透析机器运转下血液内毒素被抽走的比例。",
    "参考范围": "目标 ≥ 65%",
    "健康建议": "function(res, v){ if(res < 65) return 'URR未达标，透析效能不足。长期可能导致难治性高血压及周围神经病变，需排查动静脉内瘘是否存在狭窄或再循环现象。'; return 'URR达标，单次透析清毒效果满意。'; }",
    "category": "肾脏病学",
    "适用人群": "血液透析维持患者",
    "临床场景": "透析病历直观疗效展示"
  },
  {
    "id": "kfre_4_variable_fixed",
    "title": "肾功能衰竭风险预测 (KFRE 4-变量模型)",
    "version": "2.0",
    "输出": "2年及5年内进展至尿毒症 (ESRD) 的概率",
    "输入": [
      {
        "name": "age",
        "label": "1. 年龄 (岁)",
        "type": "number"
      },
      {
        "name": "gender",
        "label": "2. 性别",
        "type": "radio",
        "options": [
          "男",
          "女"
        ]
      },
      {
        "name": "egfr",
        "label": "3. eGFR (ml/min/1.73m²)",
        "type": "number",
        "placeholder": "15-60 之间最准确"
      },
      {
        "name": "uacr",
        "label": "4. 尿白蛋白/肌酐比 (UACR, mg/g)",
        "type": "number",
        "placeholder": "若为 24h 尿蛋白请换算"
      }
    ],
    "计算结果": "function(v){ if(!v.age || !v.egfr || !v.uacr) return '等待参数输入...'; var male = v.gender === '男' ? 1 : 0; var acr = v.uacr > 0 ? v.uacr : 1; var logit = -0.2201 * (v.age/10 - 7.036) + 0.2467 * (male - 0.5642) - 0.5567 * (v.egfr/5 - 7.222) + 0.4510 * (Math.log(acr) - 5.137); var risk5y = (1 - Math.pow(0.924, Math.exp(logit))) * 100; return '5年内进展至尿毒症概率: ' + risk5y.toFixed(1) + '%'; }",
    "计算公式": "KFRE (Kidney Failure Risk Equation) 4-Variable Model",
    "公式解读": "决策逻辑： 1. 该方程是目前全球预测 CKD 进展最精准的工具；2. 核心变量为年龄、性别、eGFR 和蛋白尿；3. 它能直接给出量化的“肾脏剩余寿命”概率。",
    "参考范围": "5年风险 > 15% 建议转诊专家；> 40% 建议准备造瘘 (AVF)",
    "健康建议": "function(res, v){ var p = parseFloat(res.split(': ')[1]); if(p > 20){ return '【高危预警】5年内透析风险达 ' + p.toFixed(1) + '%。建议：1. 严格启动肾内科专科随访；2. 严格控压 < 130/80；3. 评估内瘘手术时机。'; } return '【风险可控】当前风险较低，请坚持低盐优质低蛋白饮食，监测肾功变化。'; }",
    "category": "肾脏病学",
    "适用人群": "CKD 3-5 期非透析患者",
    "临床场景": "尿毒症风险量化沟通、透析通路早期规划参考"
  },
  {
    "id": "irp_igan_clinical_fixed",
    "title": "国际 IgA 肾病预测工具 (临床+病理版)",
    "version": "2.0",
    "输出": "5年内肾功能减退 50% 或进入 ESRD 的风险分层",
    "输入": [
      {
        "name": "egfr",
        "label": "1. 诊断时 eGFR (ml/min/1.73m²)",
        "type": "number"
      },
      {
        "name": "sbp",
        "label": "2. 基础收缩压 (mmHg)",
        "type": "number"
      },
      {
        "name": "upro",
        "label": "3. 24h 尿蛋白定量 (g/d)",
        "type": "number"
      },
      {
        "name": "mest_c",
        "label": "4. MEST-C 病理特征 (高危项勾选)",
        "type": "radio",
        "options": [
          "低危组合 (T0/C0)",
          "中高危项 (存在 T1/T2 或 C1/C2)"
        ]
      }
    ],
    "计算结果": "function(v){ if(!v.egfr || !v.upro) return '等待参数...'; var risk = '低危'; if(v.upro > 1.0 || v.egfr < 45 || v.mest_c.includes('中高危')) risk = '中高危'; if(v.upro > 3.0 && v.egfr < 30) risk = '极高危'; return '预后风险分层: ' + risk; }",
    "计算公式": "International IgAN Prediction Tool (Validated by Oxford)",
    "公式解读": "决策逻辑： 1. 结合临床指标与病理 MEST-C 评分；2. 专门预测 IgA 肾病的硬终点风险；3. 是决定是否启动激素/免疫抑制治疗的核心参考。",
    "参考范围": "高危组 5 年内肾功能恶化概率显著升高",
    "健康建议": "function(res, v){ if(res.includes('高危')){ return '【重磅临床决策】1. 风险较高，建议讨论是否启动糖皮质激素或免疫抑制剂治疗；2. 强化 RAS 阻断剂或 SGLT2i 治疗；3. 密切监测蛋白尿变化。'; } return '【维持治疗】建议以支持性治疗为主，控制血压，监测蛋白尿。'; }",
    "category": "肾脏病学",
    "适用人群": "经肾活检确诊的 IgA 肾病患者",
    "clinical_scenario": "活检后重大治疗决策 (是否冲击治疗) 的循证支持"
  },
  {
    "id": "ccr_24h",
    "title": "内生肌酐清除率(CCr)计算(24小时留尿)",
    "输出": "CCr(mL/min)",
    "输入": [
      {
        "name": "ucr",
        "label": "尿肌酐(umol/L)",
        "type": "number",
        "unit": "",
        "placeholder": "8000"
      },
      {
        "name": "vol",
        "label": "24h尿量(mL)",
        "type": "number",
        "unit": "",
        "placeholder": "1500"
      },
      {
        "name": "scr",
        "label": "血肌酐(umol/L)",
        "type": "number",
        "unit": "",
        "placeholder": "90"
      }
    ],
    "计算结果": "function(v){return Math.round((v.ucr*v.vol)/(v.scr*1440));}",
    "计算公式": "(尿肌酐×尿量) / (血肌酐×1440分钟)",
    "公式解读": "通过物理收集排泄物得出的真实清除率，是所有估算公式的比对标杆。",
    "参考范围": "80-120",
    "健康建议": "function(res, v){ return '该指标是评估肾小球滤过能力的物理金标准。其实用性极度依赖患者24小时蓄尿过程的绝对规范，漏接或体积记录错误将导致判定出现毁灭性偏差。'; }",
    "category": "肾脏病学",
    "适用人群": "诊断不明确或极端体型患者",
    "临床场景": "病房严密蓄尿检测、金标准验证"
  },
  {
    "id": "ped_ccr_scr",
    "title": "儿童内生肌酐清除率(CCr)计算(血肌酐)",
    "输出": "eGFR(mL/min)",
    "输入": [
      {
        "name": "ht",
        "label": "身高(cm)",
        "type": "number",
        "unit": "",
        "placeholder": "110"
      },
      {
        "name": "scr",
        "label": "血肌酐(umol/L)",
        "type": "number",
        "unit": "",
        "placeholder": "40"
      }
    ],
    "计算结果": "function(v){return Math.round(0.413*v.ht/(v.scr/88.4));}",
    "计算公式": "Modified Schwartz 0.413×L/Scr",
    "公式解读": "依据儿童发育长骨情况与肌酐的比值，防止儿童因肌肉少掩盖肾衰。",
    "参考范围": ">90正常",
    "健康建议": "function(res, v){ if(res < 60) return '警告：患儿滤过率显著受损。儿童期严重的慢性肾病极易引发不可逆的生长迟缓及骨骼畸形，需尽早开展针对性内分泌及营养干预。'; return '患儿肾功能评价尚在安全基线以上。但在急性感染或服用退烧药后仍需严密预防急性肾损伤。'; }",
    "category": "肾脏病学",
    "适用人群": "18岁以下儿童及青少年",
    "临床场景": "儿科肾脏门诊监测"
  }
];