var DB_LIVER = [{
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