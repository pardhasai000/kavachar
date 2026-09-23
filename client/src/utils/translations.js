// PS-41 Trilingual Localization: English, Hindi, Santali (Ol Chiki)

export const translations = {
  en: {
    appName: 'PS-41 Mine Safety & AR Training Platform',
    selectLanguageTitle: 'Select Your Training Language',
    selectLanguageSubtitle: 'Choose your preferred language to proceed with underground mine safety training.',
    continueBtn: 'Continue to Mine Selection',
    
    // Mine Selection
    selectMineTitle: 'Select Your Colliery / Mine Site',
    selectMineSubtitle: 'Training protocols and geological hazard simulations will be tailored to your chosen mine.',
    enterMineBtn: 'Enter Training for this Mine',
    riskLevel: 'Hazard Level',
    depth: 'Depth',
    hazardType: 'Primary Hazard',
    
    // Roles
    selectRoleTitle: 'Select Portal Access',
    workerRole: 'Miner / Trainee Portal',
    workerRoleDesc: 'Underground hazard simulations, safety SOPs, examination & DGMS certification.',
    adminRole: 'Safety Officer / Admin Portal',
    adminRoleDesc: 'Colliery compliance monitoring, personnel registry, certificate revocation & audits.',
    
    // Navigation
    navOverview: 'Overview',
    navGasLeak: 'Gas Leak Simulation',
    navFireExplosion: 'Fire & Explosion Simulation',
    navAssignment: 'Competency Assignment',
    navCertificate: 'Safety Certificate',
    navVerifyQR: 'Verify QR',
    switchMine: 'Change Mine',
    switchLang: 'Change Language',
    
    // Gas Leak Simulation (Simple English)
    gasLeakTitle: '3D Underground Gas Leak Drill',
    gasLeakSubtitle: 'Simple life-saving steps when dangerous gas leaks inside the mine',
    methaneLevel: 'Methane Gas (CH4)',
    coLevel: 'Poison Smoke (CO)',
    gasSafe: 'Air is Safe to Breathe',
    gasHazard: 'DANGER: Bad Gas Leak Detected!',
    stepSniffer: 'Step 1: Check for Gas',
    stepSnifferDesc: 'Turn on the gas meter to test if dangerous gas is near the roof.',
    stepSnifferAction: 'Check Gas Now',
    stepSCSR: 'Step 2: Wear Oxygen Mask',
    stepSCSRDesc: 'Put on your emergency oxygen mask fast (within 1 minute) to breathe clean air.',
    stepSCSRAction: 'Put On Mask',
    stepVent: 'Step 3: Open Air Curtain',
    stepVentDesc: 'Open the fresh air curtain so clean air blows away the bad gas.',
    stepVentAction: 'Open Curtain',
    stepEvacuate: 'Step 4: Walk Out to Fresh Air',
    stepEvacuateDesc: 'Hold the guide rope and walk out calmly with your team toward fresh air.',
    stepEvacuateAction: 'Walk Out Safely',
    gasPassedToast: 'Great job! The gas is cleared and everyone is safe.',
    simpleRulesTitleGas: 'Simple Life-Saving Steps (Gas Leak):',
    simpleRulesGas: [
      'Stop work right away — stay calm.',
      'Put on your oxygen mask fast (within 1 minute).',
      'No sparks or fire — do not touch electrical switches.',
      'Hold the guide rope and walk out to fresh air.'
    ],
    
    // Fire & Explosion Simulation (Simple English)
    fireTitle: '3D Mine Fire & Blast Drill',
    fireSubtitle: 'Simple life-saving steps to stop fire and get everyone out safely',
    tempLevel: 'Tunnel Heat',
    smokeDensity: 'Smoke Level',
    fireSafe: 'Fire Stopped - Area Safe',
    fireDanger: 'DANGER: Big Fire & Blast Risk!',
    stepStoneDust: 'Step 1: Drop Stone Dust',
    stepStoneDustDesc: 'Drop stone dust bags from the ceiling to stop the fire blast immediately.',
    stepStoneDustAction: 'Drop Stone Dust',
    stepDeluge: 'Step 2: Spray Fire Foam',
    stepDelugeDesc: 'Spray thick fire foam straight onto the burning coal to put out the fire.',
    stepDelugeAction: 'Spray Foam Now',
    stepFireDoor: 'Step 3: Shut Fire Doors',
    stepFireDoorDesc: 'Close heavy steel doors to block smoke and cut off air to the fire.',
    stepFireDoorAction: 'Shut Fire Doors',
    stepRefuge: 'Step 4: Go into Safe Room',
    stepRefugeDesc: 'Go inside the safe underground room. It has clean oxygen, food, water, and phone.',
    stepRefugeAction: 'Enter Safe Room',
    firePassedToast: 'Great job! The fire is blocked and everyone is safe in the shelter room.',
    simpleRulesTitleFire: 'Simple Life-Saving Steps (Fire Accident):',
    simpleRulesFire: [
      'Shout and warn all fellow miners immediately.',
      'Drop stone dust bags to stop the flame blast.',
      'Spray thick foam onto burning coal to put it out.',
      'Walk low under smoke and enter the safe shelter room.'
    ],
    
    // Assignment
    assignmentTitle: 'Mine Hazard Safety Competency Assignment',
    assignmentSubtitle: 'Mandatory DGMS evaluation covering gas leaks, explosion limits, and emergency protocols.',
    submitAssignment: 'Submit Assignment & Generate Certificate',
    scoreLabel: 'Your Score',
    passedTitle: 'ASSIGNMENT PASSED - QUALIFIED MINER',
    failedTitle: 'ASSIGNMENT NOT PASSED - RETRY REQUIRED',
    viewCertBtn: 'View DGMS Safety Certificate',
    retryBtn: 'Retry Assignment',
    
    // Certificate
    certTitle: 'DIRECTORATE GENERAL OF MINES SAFETY (DGMS)',
    certSub: 'Statutory Mining Competency Credential • Coal Mines Regulations (CMR 2017)',
    certBody1: 'This is to officially certify that',
    certBody2: 'has demonstrated mastery in underground mine disaster management, including interactive 3D simulations of Methane Gas Inrush and Coal Dust Fire Explosion Containment at',
    certStd: 'Accreditation: DGMS Standard & Coal Mines Regulations 2017',
    downloadPdf: 'Download Official PDF',
    verifyPublicly: 'Verify Publicly via QR',
    
    // Admin
    adminDashboardTitle: 'Colliery Safety Command Center',
    adminSubtitle: 'Live compliance monitoring, drill logs, and miner certification registry across mines.',
    totalMiners: 'Active Miners',
    drillsCompleted: 'Simulations Cleared',
    certsIssued: 'Issued DGMS Credentials',
    passRate: 'Assessment Pass Rate'
  },

  hi: {
    appName: 'PS-41 खदान सुरक्षा एवं एआर प्रशिक्षण मंच',
    selectLanguageTitle: 'अपनी प्रशिक्षण भाषा चुनें',
    selectLanguageSubtitle: 'भूमिगत खदान सुरक्षा प्रशिक्षण शुरू करने के लिए अपनी पसंदीदा भाषा चुनें।',
    continueBtn: 'खदान चयन के लिए आगे बढ़ें',
    
    // Mine Selection
    selectMineTitle: 'अपनी कोयला खदान (कोलियरी) चुनें',
    selectMineSubtitle: 'सुरक्षा नियम और भूगर्भीय खतरे का 3D सिमुलेशन आपकी चुनी हुई खदान के अनुसार होगा।',
    enterMineBtn: 'इस खदान के लिए प्रशिक्षण शुरू करें',
    riskLevel: 'खतरा स्तर',
    depth: 'खदान की गहराई',
    hazardType: 'मुख्य खतरा',
    
    // Roles
    selectRoleTitle: 'पोर्टल चुनें',
    workerRole: 'खनिक / प्रशिक्षु पोर्टल (Worker)',
    workerRoleDesc: '3D गैस रिसाव एवं आग विस्फोट सिमुलेशन, सुरक्षा परीक्षा और DGMS प्रमाणपत्र।',
    adminRole: 'सुरक्षा अधिकारी / एडमिन पोर्टल (Admin)',
    adminRoleDesc: 'खदानवार अनुपालन निगरानी, खनिक रिकॉर्ड, प्रमाणपत्र निरस्तीकरण और ऑडिट।',
    
    // Navigation
    navOverview: 'अवलोकन',
    navGasLeak: 'गैस रिसाव सिमुलेशन',
    navFireExplosion: 'आग एवं विस्फोट सिमुलेशन',
    navAssignment: 'सुरक्षा असाइनमेंट / परीक्षा',
    navCertificate: 'सुरक्षा प्रमाणपत्र',
    navVerifyQR: 'क्यूआर सत्यापन (Verify QR)',
    switchMine: 'खदान बदलें',
    switchLang: 'भाषा बदलें',
    
    // Gas Leak Simulation (आसान हिंदी)
    gasLeakTitle: '3D गैस रिसाव सुरक्षा अभ्यास',
    gasLeakSubtitle: 'खदान में खतरनाक गैस का रिसाव होने पर जान बचाने के आसान नियम',
    methaneLevel: 'मीथेन गैस (CH4)',
    coLevel: 'जहरीला धुआं (CO)',
    gasSafe: 'हवा सांस लेने के लिए सुरक्षित है',
    gasHazard: 'खतरा: जहरीली गैस का रिसाव!',
    stepSniffer: 'कदम 1: गैस मीटर चालू करें',
    stepSnifferDesc: 'छत के पास खतरनाक गैस जांचने के लिए गैस मीटर ऑन करें।',
    stepSnifferAction: 'मीटर चालू करें',
    stepSCSR: 'कदम 2: ऑक्सीजन मास्क पहनें',
    stepSCSRDesc: 'साफ सांस लेने के लिए 1 मिनट के अंदर तुरंत अपना इमरजेंसी मास्क पहनें।',
    stepSCSRAction: 'मास्क पहनें',
    stepVent: 'कदम 3: ताजी हवा का पर्दा खोलें',
    stepVentDesc: 'ताजी हवा का पर्दा खोलें ताकि साफ हवा खराब गैस को बाहर निकाल दे।',
    stepVentAction: 'पर्दा खोलें',
    stepEvacuate: 'कदम 4: ताजी हवा की तरफ बाहर निकलें',
    stepEvacuateDesc: 'रस्सी पकड़ें और अपने साथियों के साथ ताजी हवा की तरफ शांत रहकर बाहर निकलें।',
    stepEvacuateAction: 'सुरक्षित बाहर निकलें',
    gasPassedToast: 'शाबाश! खराब गैस बाहर निकाल दी गई और सभी साथी सुरक्षित हैं।',
    simpleRulesTitleGas: 'गैस रिसाव होने पर 4 आसान नियम:',
    simpleRulesGas: [
      'तुरंत काम रोकें — घबराएं नहीं।',
      '1 मिनट के अंदर अपना ऑक्सीजन मास्क पहनें।',
      'माचिस, लाइटर या बिजली का स्विच न छुएं।',
      'रस्सी पकड़कर ताजी हवा की तरफ बाहर निकलें।'
    ],
    
    // Fire & Explosion Simulation (आसान हिंदी)
    fireTitle: '3D खदान आग एवं विस्फोट सुरक्षा अभ्यास',
    fireSubtitle: 'आग बुझाने और सुरक्षित बचने के आसान नियम',
    tempLevel: 'खदान की गर्मी',
    smokeDensity: 'धुएं की मात्रा',
    fireSafe: 'आग बुझ गई - जगह सुरक्षित है',
    fireDanger: 'खतरा: आग और विस्फोट का डर!',
    stepStoneDust: 'कदम 1: पत्थर की धूल (स्टोन डस्ट) गिराएं',
    stepStoneDustDesc: 'आग की लपटों को तुरंत रोकने के लिए छत से स्टोन डस्ट बैग गिराएं।',
    stepStoneDustAction: 'स्टोन डस्ट गिराएं',
    stepDeluge: 'कदम 2: आग पर फोम छिड़कें',
    stepDelugeDesc: 'सुलगते कोयले पर सीधा गाढ़ा फोम छिड़क कर आग बुझाएं।',
    stepDelugeAction: 'फोम छिड़कें',
    stepFireDoor: 'कदम 3: लोहे के अग्नि दरवाजे बंद करें',
    stepFireDoorDesc: 'आग की हवा रोकने और धुआं रोकने के लिए भारी लोहे के दरवाजे बंद करें।',
    stepFireDoorAction: 'दरवाजे बंद करें',
    stepRefuge: 'कदम 4: सुरक्षित कमरे (शरण स्थल) में जाएं',
    stepRefugeDesc: 'भूमिगत सुरक्षित कमरे में जाएं। यहां साफ ऑक्सीजन, खाना, पानी और फोन है।',
    stepRefugeAction: 'कमरे में जाएं',
    firePassedToast: 'शाबाश! आग रोक दी गई और सभी साथी सुरक्षित कमरे में पहुंच गए।',
    simpleRulesTitleFire: 'आग और विस्फोट होने पर 4 आसान नियम:',
    simpleRulesFire: [
      'तुरंत चिल्लाकर सभी साथियों को सावधान करें।',
      'आग की लपटों को रोकने के लिए स्टोन डस्ट बैग गिराएं।',
      'सुलगते कोयले पर सीधा गाढ़ा फोम छिड़कें।',
      'धुएं से बचकर झुककर चलें और सुरक्षित कमरे में जाएं।'
    ],
    
    // Assignment
    assignmentTitle: 'खदान आपदा सुरक्षा दक्षता परीक्षा (असाइनमेंट)',
    assignmentSubtitle: 'गैस रिसाव, विस्फोट सीमा और आपातकालीन नियमों पर आधारित DGMS मूल्यांकन।',
    submitAssignment: 'असाइनमेंट जमा करें एवं प्रमाणपत्र पाएं',
    scoreLabel: 'आपका प्राप्तांक',
    passedTitle: 'परीक्षा उत्तीर्ण - प्रमाणित कुशल खनिक!',
    failedTitle: 'परीक्षा अनुत्तीर्ण - पुनः प्रयास करें',
    viewCertBtn: 'DGMS सुरक्षा प्रमाणपत्र देखें',
    retryBtn: 'पुनः परीक्षा दें',
    
    // Certificate
    certTitle: 'खान सुरक्षा महानिदेशालय (DGMS)',
    certSub: 'सांविधिक खनन योग्यता प्रमाणपत्र • कोयला खान विनियम (CMR 2017)',
    certBody1: 'प्रमाणित किया जाता है कि',
    certBody2: 'ने भूमिगत मीथेन गैस रिसाव और कोयला धूल आग-विस्फोट नियंत्रण के 3D सिमुलेशन अभ्यास को सफलतापूर्वक पूर्ण किया है। खदान:',
    certStd: 'मान्यता: DGMS मानक एवं कोयला खान विनियम 2017',
    downloadPdf: 'आधिकारिक PDF डाउनलोड करें',
    verifyPublicly: 'QR द्वारा सार्वजनिक सत्यापन करें',
    
    // Admin
    adminDashboardTitle: 'कोलियरी सुरक्षा नियंत्रण केंद्र (Admin)',
    adminSubtitle: 'खदानवार सुरक्षा अनुपालन, ड्रिल रिपोर्ट और खनिक प्रमाणपत्र रजिस्ट्री।',
    totalMiners: 'कुल पंजीकृत खनिक',
    drillsCompleted: 'पूर्ण की गई 3D ड्रिल्स',
    certsIssued: 'जारी DGMS प्रमाणपत्र',
    passRate: 'सफलता दर'
  },

  sat: {
    appName: 'PS-41 ᱠᱷᱟᱫᱟᱱ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱟᱨ AR ᱴᱨᱮᱱᱤᱝ ᱯᱞᱮᱴᱯᱷᱚᱨᱢ',
    selectLanguageTitle: 'ᱟᱢᱟᱜ ᱴᱨᱮᱱᱤᱝ ᱯᱟᱹᱨᱥᱤ ᱵᱟᱪᱷᱟᱣ ᱢᱮ',
    selectLanguageSubtitle: 'ᱠᱷᱟᱫᱟᱱ ᱵᱷᱤᱛᱨᱤ ᱨᱮ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱪᱮᱫᱚᱜ ᱞᱟᱹᱜᱤᱫ ᱯᱟᱹᱨᱥᱤ ᱵᱟᱪᱷᱟᱣ ᱢᱮ (Choose Language)᱾',
    continueBtn: 'ᱠᱷᱟᱫᱟᱱ ᱵᱟᱪᱷᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱞᱟᱦᱟᱜ ᱢᱮ',
    
    // Mine Selection
    selectMineTitle: 'ᱟᱢᱟᱜ ᱠᱩᱭᱞᱟᱹ ᱠᱷᱟᱫᱟᱱ (Colliery) ᱵᱟᱪᱷᱟᱣ ᱢᱮ',
    selectMineSubtitle: 'ᱠᱷᱟᱫᱟᱱ ᱨᱮᱱᱟᱜ ᱵᱤᱯᱚᱫᱽ ᱟᱨ 3D ᱥᱤᱢᱩᱞᱮᱥᱚᱱ ᱱᱚᱶᱟ ᱞᱮᱠᱟᱛᱮ ᱪᱟᱞᱟᱜᱼᱟ᱾',
    enterMineBtn: 'ᱱᱚᱶᱟ ᱠᱷᱟᱫᱟᱱ ᱨᱮ ᱴᱨᱮᱱᱤᱝ ᱮᱛᱚᱦᱚᱵᱽ ᱢᱮ',
    riskLevel: 'ᱵᱤᱯᱚᱫᱽ ᱛᱷᱚᱠ (Hazard)',
    depth: 'ᱠᱷᱟᱫᱟᱱ ᱜᱟᱹᱦᱤᱨ (Depth)',
    hazardType: 'ᱢᱩᱬᱩᱛ ᱵᱤᱯᱚᱫᱽ',
    
    // Roles
    selectRoleTitle: 'ᱯᱳᱨᱴᱟᱞ ᱵᱟᱪᱷᱟᱣ ᱢᱮ',
    workerRole: 'ᱠᱟᱹᱢᱤᱭᱟᱹ / ᱢᱟᱭᱱᱚᱨ ᱯᱳᱨᱴᱟᱞ (Worker)',
    workerRoleDesc: '3D ᱜᱮᱥ ᱞᱤᱠ ᱟᱨ ᱥᱮᱸᱜᱮᱞ ᱯᱷᱩᱴᱟᱹᱣ ᱥᱤᱢᱩᱞᱮᱥᱚᱱ, ᱵᱤᱱᱤᱰ ᱟᱨ DGMS ᱥᱟᱨᱴᱤᱯᱷᱤᱠᱮᱴ᱾',
    adminRole: 'ᱨᱩᱠᱷᱤᱭᱟᱹ ᱚᱯᱷᱤᱥᱚᱨ / ᱮᱰᱢᱤᱱ (Admin)',
    adminRoleDesc: 'ᱠᱷᱟᱫᱟᱱ ᱨᱮᱱᱟᱜ ᱨᱤᱯᱳᱨᱴ, ᱠᱟᱹᱢᱤᱭᱟᱹ ᱨᱮᱠᱳᱨᱰ ᱟᱨ ᱥᱟᱨᱴᱤᱯᱷᱤᱠᱮᱴ ᱡᱟᱸᱪ᱾',
    
    // Navigation
    navOverview: 'ᱧᱮᱞ ᱯᱩᱥᱴᱟᱹᱣ',
    navGasLeak: 'ᱜᱮᱥ ᱞᱤᱠ ᱥᱤᱢᱩᱞᱮᱥᱚᱱ',
    navFireExplosion: 'ᱥᱮᱸᱜᱮᱞ ᱟᱨ ᱯᱷᱩᱴᱟᱹᱣ ᱥᱤᱢᱩᱞᱮᱥᱚᱱ',
    navAssignment: 'ᱨᱩᱠᱷᱤᱭᱟᱹ ᱵᱤᱱᱤᱰ (Assignment)',
    navCertificate: 'ᱨᱩᱠᱷᱤᱭᱟᱹ ᱥᱟᱨᱴᱤᱯᱷᱤᱠᱮᱴ',
    navVerifyQR: 'QR ᱯᱩᱥᱴᱟᱹᱣ (Verify QR)',
    switchMine: 'ᱠᱷᱟᱫᱟᱱ ᱵᱚᱫᱚᱞ',
    switchLang: 'ᱯᱟᱹᱨᱥᱤ ᱵᱚᱫᱚᱞ',
    
    // Gas Leak Simulation (ᱥᱟᱱᱛᱟᱲᱤ)
    gasLeakTitle: '3D ᱜᱮᱥ ᱞᱤᱠ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱴᱨᱮᱱᱤᱝ',
    gasLeakSubtitle: 'ᱜᱮᱥ ᱞᱤᱠ ᱡᱚᱠᱷᱟᱜ ᱵᱟᱧᱪᱟᱣᱜ ᱨᱮᱱᱟᱜ ᱟᱞᱜᱟ ᱱᱤᱭᱚᱢ',
    methaneLevel: 'ᱢᱤᱛᱷᱮᱱ ᱜᱮᱥ (CH4)',
    coLevel: 'ᱵᱤᱥ ᱫᱷᱩᱶᱟᱸ (CO)',
    gasSafe: 'ᱦᱚᱭ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱜᱮᱭᱟ',
    gasHazard: 'ᱵᱤᱯᱚᱫᱽ: ᱵᱤᱥ ᱜᱮᱥ ᱞᱤᱠ ᱠᱟᱱᱟ!',
    stepSniffer: 'ᱛᱷᱚᱠ ᱑: ᱜᱮᱥ ᱰᱤᱴᱮᱠᱴᱚᱨ ᱪᱟᱹᱞᱩᱭ ᱢᱮ',
    stepSnifferDesc: 'ᱪᱷᱟᱛ ᱨᱮ ᱵᱤᱥ ᱜᱮᱥ ᱢᱮᱱᱟᱜ-ᱟ ᱥᱮ ᱵᱟᱝ ᱚᱱᱟ ᱡᱟᱸᱪ ᱢᱮ᱾',
    stepSnifferAction: 'ᱰᱤᱴᱮᱠᱴᱚᱨ ᱪᱟᱹᱞᱩᱭ ᱢᱮ',
    stepSCSR: 'ᱛᱷᱚᱠ ᱒: ᱚᱠᱥᱤᱡᱮᱱ ᱢᱟᱥᱠ ᱦᱚᱨᱚᱜᱽ ᱢᱮ',
    stepSCSRDesc: 'ᱥᱟᱯᱷᱟ ᱥᱟᱦᱮᱫ ᱦᱟᱛᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱑ ᱢᱤᱱᱤᱴ ᱵᱷᱤᱛᱨᱤ ᱨᱮ ᱢᱟᱥᱠ ᱦᱚᱨᱚᱜᱽ ᱢᱮ᱾',
    stepSCSRAction: 'ᱢᱟᱥᱠ ᱦᱚᱨᱚᱜᱽ ᱢᱮ',
    stepVent: 'ᱛᱷᱚᱠ ᱓: ᱥᱟᱯᱷᱟ ᱦᱚᱭ ᱯᱚᱨᱫᱟ ᱛᱚᱞ ᱢᱮ',
    stepVentDesc: 'ᱥᱟᱯᱷᱟ ᱦᱚᱭ ᱯᱚᱨᱫᱟ ᱛᱚᱞ ᱠᱟᱛᱮ ᱵᱟᱹᱲᱤᱡ ᱜᱮᱥ ᱵᱟᱦᱨᱮ ᱥᱮᱱ ᱞᱟᱜᱟᱭ ᱢᱮ᱾',
    stepVentAction: 'ᱯᱚᱨᱫᱟ ᱛᱚᱞ ᱢᱮ',
    stepEvacuate: 'ᱛᱷᱚᱠ ᱔: ᱥᱟᱯᱷᱟ ᱦᱚᱭ ᱰᱟᱦᱟᱨ ᱛᱮ ᱚᱰᱚᱠᱚᱜ ᱢᱮ',
    stepEvacuateDesc: 'ᱫᱟᱹᱲᱤ ᱥᱟᱵ ᱠᱟᱛᱮ ᱥᱟᱱᱟᱢ ᱜᱟᱛᱮ ᱥᱟᱶ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱛᱮ ᱵᱟᱦᱨᱮ ᱚᱰᱚᱠᱚᱜ ᱢᱮ᱾',
    stepEvacuateAction: 'ᱵᱟᱦᱨᱮ ᱚᱰᱚᱠᱚᱜ ᱢᱮ',
    gasPassedToast: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ! ᱵᱟᱹᱲᱤᱡ ᱜᱮᱥ ᱥᱟᱦᱟᱭᱮᱱᱟ ᱟᱨ ᱥᱟᱱᱟᱢ ᱦᱚᱲ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱢᱮᱱᱟᱜ ᱠᱚᱣᱟ᱾',
    simpleRulesTitleGas: 'ᱜᱮᱥ ᱞᱤᱠ ᱡᱚᱠᱷᱟᱜ ᱔ ᱜᱚᱴᱟᱝ ᱟᱞᱜᱟ ᱱᱤᱭᱚᱢ:',
    simpleRulesGas: [
      'ᱞᱚᱜᱚᱱ ᱠᱟᱹᱢᱤ ᱵᱚᱸᱫᱽ ᱢᱮ — ᱟᱞᱚᱢ ᱵᱚᱛᱚᱨᱚᱜ-ᱟ᱾',
      '᱑ ᱢᱤᱱᱤᱴ ᱵᱷᱤᱛᱨᱤ ᱨᱮ ᱚᱠᱥᱤᱡᱮᱱ ᱢᱟᱥᱠ ᱦᱚᱨᱚᱜᱽ ᱢᱮ᱾',
      'ᱥᱮᱸᱜᱮᱞ ᱟᱨ ᱵᱤᱡᱽᱞᱤ ᱥᱩᱭᱤᱪ ᱟᱞᱚᱢ ᱡᱚᱴᱮᱫ-ᱟ᱾',
      'ᱫᱟᱹᱲᱤ ᱥᱟᱵ ᱠᱟᱛᱮ ᱥᱟᱯᱷᱟ ᱦᱚᱭ ᱥᱮᱱ ᱚᱰᱚᱠᱚᱜ ᱢᱮ᱾'
    ],
    
    // Fire & Explosion Simulation (ᱥᱟᱱᱛᱟᱲᱤ)
    fireTitle: '3D ᱥᱮᱸᱜᱮᱞ ᱟᱨ ᱯᱷᱩᱴᱟᱹᱣ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱴᱨᱮᱱᱤᱝ',
    fireSubtitle: 'ᱥᱮᱸᱜᱮᱞ ᱤᱬᱤᱡ ᱟᱨ ᱨᱩᱠᱷᱤᱭᱟᱹᱜ ᱨᱮᱱᱟᱜ ᱟᱞᱜᱟ ᱰᱟᱦᱟᱨ',
    tempLevel: 'ᱠᱷᱟᱫᱟᱱ ᱞᱚᱞᱚ',
    smokeDensity: 'ᱫᱷᱩᱶᱟᱸ ᱛᱷᱚᱠ',
    fireSafe: 'ᱥᱮᱸᱜᱮᱞ ᱤᱬᱤᱡ ᱮᱱᱟ - ᱡᱟᱭᱜᱟ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱜᱮᱭᱟ',
    fireDanger: 'ᱵᱤᱯᱚᱫᱽ: ᱥᱮᱸᱜᱮᱞ ᱟᱨ ᱯᱷᱩᱴᱟᱹᱣ ᱦᱩᱭ ᱫᱟᱲᱮᱭᱟᱜ-ᱟ!',
    stepStoneDust: 'ᱛᱷᱚᱠ ᱑: ᱫᱷᱤᱨᱤ ᱫᱷᱩᱲᱤ (Stone Dust) ᱜᱤᱰᱤ ᱢᱮ',
    stepStoneDustDesc: 'ᱥᱮᱸᱜᱮᱞ ᱯᱷᱩᱴᱟᱹᱣ ᱞᱚᱜᱚᱱ ᱵᱚᱸᱫᱽ ᱞᱟᱹᱜᱤᱫ ᱪᱷᱟᱛ ᱠᱷᱚᱱ ᱫᱷᱤᱨᱤ ᱫᱷᱩᱲᱤ ᱜᱤᱰᱤ ᱢᱮ᱾',
    stepStoneDustAction: 'ᱫᱷᱩᱲᱤ ᱜᱤᱰᱤ ᱢᱮ',
    stepDeluge: 'ᱛᱷᱚᱠ ᱒: ᱥᱮᱸᱜᱮᱞ ᱨᱮ ᱯᱷᱳᱢ ᱪᱷᱤᱴᱠᱟᱹᱣ ᱢᱮ',
    stepDelugeDesc: 'ᱞᱚᱞᱚ ᱠᱩᱭᱞᱟᱹ ᱪᱮᱛᱟᱱ ᱨᱮ ᱯᱷᱳᱢ ᱪᱷᱤᱴᱠᱟᱹᱣ ᱠᱟᱛᱮ ᱥᱮᱸᱜᱮᱞ ᱤᱬᱤᱡ ᱢᱮ᱾',
    stepDelugeAction: 'ᱯᱷᱳᱢ ᱪᱷᱤᱴᱠᱟᱹᱣ ᱢᱮ',
    stepFireDoor: 'ᱛᱷᱚᱠ ᱓: ᱢᱮᱬᱦᱮᱫ ᱫᱩᱣᱟᱹᱨ ᱵᱚᱸᱫᱽ ᱢᱮ',
    stepFireDoorDesc: 'ᱥᱮᱸᱜᱮᱞ ᱨᱮᱱᱟᱜ ᱦᱚᱭ ᱟᱨ ᱫᱷᱩᱶᱟᱸ ᱟᱴᱠᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱫᱩᱣᱟᱹᱨ ᱵᱚᱸᱫᱽ ᱢᱮ᱾',
    stepFireDoorAction: 'ᱫᱩᱣᱟᱹᱨ ᱵᱚᱸᱫᱽ ᱢᱮ',
    stepRefuge: 'ᱛᱷᱚᱠ ᱔: ᱨᱩᱠᱷᱤᱭᱟᱹ ᱠᱳᱴᱷᱟ (Safe Room) ᱛᱮ ᱪᱟᱞᱟᱜ ᱢᱮ',
    stepRefugeDesc: 'ᱨᱩᱠᱷᱤᱭᱟᱹ ᱠᱳᱴᱷᱟ ᱛᱮ ᱪᱟᱞᱟᱜ ᱢᱮ, ᱡᱟᱦᱟᱸ ᱨᱮ ᱥᱟᱯᱷᱟ ᱚᱠᱥᱤᱡᱮᱱ, ᱫᱟᱜ ᱟᱨ ᱯᱷᱳᱱ ᱢᱮᱱᱟᱜ-ᱟ᱾',
    stepRefugeAction: 'ᱠᱳᱴᱷᱟ ᱛᱮ ᱪᱟᱞᱟᱜ ᱢᱮ',
    firePassedToast: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ! ᱥᱮᱸᱜᱮᱞ ᱟᱴᱠᱟᱣ ᱮᱱᱟ ᱟᱨ ᱥᱟᱱᱟᱢ ᱦᱚᱲ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱠᱳᱴᱷᱟ ᱨᱮᱠᱚ ᱥᱮᱴᱮᱨ ᱮᱱᱟ᱾',
    simpleRulesTitleFire: 'ᱥᱮᱸᱜᱮᱞ ᱟᱨ ᱯᱷᱩᱴᱟᱹᱣ ᱡᱚᱠᱷᱟᱜ ᱔ ᱜᱚᱴᱟᱝ ᱟᱞᱜᱟ ᱱᱤᱭᱚᱢ:',
    simpleRulesFire: [
      'ᱞᱚᱜᱚᱱ ᱠᱮᱴᱮᱡ ᱛᱮ ᱦᱚᱦᱚ ᱠᱟᱛᱮ ᱜᱟᱛᱮ ᱠᱚ ᱞᱟᱹᱭ ᱟᱠᱚ ᱢᱮ᱾',
      'ᱥᱮᱸᱜᱮᱞ ᱯᱷᱩᱴᱟᱹᱣ ᱟᱴᱠᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱫᱷᱤᱨᱤ ᱫᱷᱩᱲᱤ ᱜᱤᱰᱤ ᱢᱮ᱾',
      'ᱞᱚᱞᱚ ᱠᱩᱭᱞᱟᱹ ᱪᱮᱛᱟᱱ ᱨᱮ ᱯᱷᱳᱢ ᱪᱷᱤᱴᱠᱟᱹᱣ ᱠᱟᱛᱮ ᱤᱬᱤᱡ ᱢᱮ᱾',
      'ᱫᱷᱩᱶᱟᱸ ᱠᱷᱚᱱ ᱵᱟᱧᱪᱟᱣ ᱠᱟᱛᱮ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱠᱳᱴᱷᱟ ᱛᱮ ᱪᱟᱞᱟᱜ ᱢᱮ᱾'
    ],
    
    // Assignment
    assignmentTitle: 'ᱠᱷᱟᱫᱟᱱ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱠᱟᱹᱢᱤᱦᱚᱨᱟ ᱵᱤᱱᱤᱰ (Assignment)',
    assignmentSubtitle: 'ᱜᱮᱥ ᱞᱤᱠ, ᱯᱷᱩᱴᱟᱹᱣ ᱟᱨ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱱᱤᱭᱚᱢ ᱪᱮᱛᱟᱱ DGMS ᱵᱤᱱᱤᱰ᱾',
    submitAssignment: 'ᱵᱤᱱᱤᱰ ᱮᱢ ᱢᱮ ᱟᱨ ᱥᱟᱨᱴᱤᱯᱷᱤᱠᱮᱴ ᱧᱟᱢ ᱢᱮ',
    scoreLabel: 'ᱟᱢᱟᱜ ᱱᱚᱢᱵᱚᱨ',
    passedTitle: 'ᱵᱤᱱᱤᱰ ᱯᱟᱥ ᱮᱱᱟ - ᱯᱟᱹᱨᱩᱠᱷᱤᱭᱟᱹ ᱢᱟᱭᱱᱚᱨ!',
    failedTitle: 'ᱵᱟᱝ ᱯᱟᱥ ᱞᱮᱱᱟ - ᱟᱨᱦᱚᱸ ᱪᱮᱥᱴᱟᱭ ᱢᱮ',
    viewCertBtn: 'DGMS ᱨᱩᱠᱷᱤᱭᱟᱹ ᱥᱟᱨᱴᱤᱯᱷᱤᱠᱮᱴ ᱧᱮᱞ ᱢᱮ',
    retryBtn: 'ᱟᱨᱦᱚᱸ ᱵᱤᱱᱤᱰ ᱮᱢ ᱢᱮ',
    
    // Certificate
    certTitle: 'ᱠᱷᱟᱫᱟᱱ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱢᱟᱦᱟ-ᱪᱟᱪᱟᱞᱟᱣᱤᱭᱟᱹ (DGMS)',
    certSub: 'ᱥᱚᱨᱠᱟᱨᱤ ᱠᱷᱟᱫᱟᱱ ᱯᱟᱹᱨᱩᱠᱷᱤᱭᱟᱹ ᱥᱟᱨᱴᱤᱯᱷᱤᱠᱮᱴ • ᱠᱩᱭᱞᱟᱹ ᱠᱷᱟᱫᱟᱱ ᱟᱹᱱ (CMR 2017)',
    certBody1: 'ᱥᱟᱹᱨᱤ ᱜᱮ ᱯᱟᱹᱛᱭᱟᱹᱣ ᱮᱢᱚᱜ ᱠᱟᱱᱟ ᱡᱮ',
    certBody2: 'ᱫᱚ ᱠᱷᱟᱫᱟᱱ ᱵᱷᱤᱛᱨᱤ ᱢᱤᱛᱷᱮᱱ ᱜᱮᱥ ᱟᱨ ᱠᱩᱭᱞᱟᱹ ᱥᱮᱸᱜᱮᱞ ᱯᱷᱩᱴᱟᱹᱣ ᱨᱩᱠᱷᱤᱭᱟᱹ 3D ᱴᱨᱮᱱᱤᱝ ᱱᱟᱯᱟᱭ ᱛᱮᱭ ᱯᱩᱨᱟᱹᱣ ᱠᱮᱫᱼᱟ᱾ ᱠᱷᱟᱫᱟᱱ:',
    certStd: 'ᱢᱟᱱᱚᱛ: DGMS ᱢᱟᱱᱚᱠ ᱟᱨ ᱠᱩᱭᱞᱟᱹ ᱠᱷᱟᱫᱟᱱ ᱟᱹᱱ ᱒᱐᱑᱗',
    downloadPdf: 'ᱥᱚᱨᱠᱟᱨᱤ PDF ᱰᱟᱣᱩᱱᱞᱳᱰ ᱢᱮ',
    verifyPublicly: 'QR ᱛᱮ ᱯᱩᱥᱴᱟᱹᱣ ᱢᱮ',
    
    // Admin
    adminDashboardTitle: 'ᱠᱚᱞᱤᱭᱟᱨᱤ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱠᱚᱢᱟᱱᱰ ᱥᱮᱱᱴᱟᱨ (Admin)',
    adminSubtitle: 'ᱠᱷᱟᱫᱟᱱ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱨᱤᱯᱳᱨᱴ, ᱴᱨᱮᱱᱤᱝ ᱞᱚᱜᱽ ᱟᱨ ᱠᱟᱹᱢᱤᱭᱟᱹ ᱥᱟᱨᱴᱤᱯᱷᱤᱠᱮᱴ ᱨᱮᱠᱳᱨᱰ᱾',
    totalMiners: 'ᱠᱟᱹᱢᱤᱭᱟᱹ ᱠᱚ',
    drillsCompleted: 'ᱯᱩᱨᱟᱹᱣ ᱟᱠᱟᱱ 3D ᱰᱨᱤᱞ',
    certsIssued: 'ᱮᱢ ᱟᱠᱟᱱ DGMS ᱥᱟᱨᱴᱤᱯᱷᱤᱠᱮᱴ',
    passRate: 'ᱯᱟᱥ ᱦᱟᱨ'
  }
};

// // Jharkhand State Coal & Mineral Mines Catalog (Govt of Jharkhand / DGMS Eastern Zone)
export const MINES_CATALOG = [
  {
    id: 'mine_jharia',
    name: 'Jharia Underground Coalfield Pit #4',
    nameHi: 'झरिया भूमिगत कोयला खदान पिट #4',
    nameSat: 'ᱡᱷᱟᱨᱤᱭᱟ ᱠᱩᱭᱞᱟᱹ ᱠᱷᱟᱫᱟᱱ ᱯᱤᱴ #᱔',
    company: 'Bharat Coking Coal Limited (BCCL)',
    location: 'Dhanbad, Jharkhand (झारखंड)',
    depth: '420 Meters',
    hazardRating: 'Critical (Degree-III Gassy)',
    hazardType: 'Underground Methane Inrush & Spontaneous Coal Combustion',
    badgeColor: 'red'
  },
  {
    id: 'mine_bokaro',
    name: 'Bokaro Bermo Deep Colliery & Incline',
    nameHi: 'बोकारो बेरमो गहरी कोलियरी एवं इनक्लाइन',
    nameSat: 'ᱵᱚᱠᱟᱨᱚ ᱵᱮᱨᱢᱳ ᱜᱟᱹᱦᱤᱨ ᱠᱚᱞᱤᱭᱟᱨᱤ',
    company: 'Central Coalfields Limited (CCL)',
    location: 'Bokaro, Jharkhand (झारखंड)',
    depth: '510 Meters',
    hazardRating: 'High (Degree-III Gassy)',
    hazardType: 'Coal Dust Explosion & High Methane Emission in Deep Seam',
    badgeColor: 'amber'
  },
  {
    id: 'mine_karanpura',
    name: 'North Karanpura (Pipwar Colliery)',
    nameHi: 'उत्तरी कर्णपुरा (पिपरवार कोलियरी)',
    nameSat: 'ᱩᱛᱛᱚᱨ ᱠᱚᱨᱚᱱᱯᱩᱨᱟ ᱠᱚᱞᱤᱭᱟᱨᱤ',
    company: 'Central Coalfields Limited (CCL)',
    location: 'Chatra / Ranchi, Jharkhand (झारखंड)',
    depth: '320 Meters',
    hazardRating: 'High (Degree-II Gassy)',
    hazardType: 'Spontaneous Coal Seam Heating & Toxic Carbon Monoxide Build-up',
    badgeColor: 'orange'
  },
  {
    id: 'mine_rajrappa',
    name: 'Rajrappa Underground Incline Project',
    nameHi: 'रजरप्पा भूमिगत इनक्लाइन परियोजना',
    nameSat: 'ᱨᱟᱡᱽᱨᱟᱯᱯᱟ ᱠᱷᱟᱫᱟᱱ ᱯᱨᱚᱡᱮᱠᱴ',
    company: 'Central Coalfields Limited (CCL)',
    location: 'Ramgarh, Jharkhand (झारखंड)',
    depth: '360 Meters',
    hazardRating: 'High Risk',
    hazardType: 'Water Inrush, Heavy Roof Fractures & Flammable Gas Inflow',
    badgeColor: 'blue'
  },
  {
    id: 'mine_jaduguda',
    name: 'Jaduguda Deep Underground Shaft',
    nameHi: 'जादूगोड़ा गहरी भूमिगत शाफ्ट',
    nameSat: 'ᱡᱟᱫᱩᱜᱚᱰᱟ ᱜᱟᱹᱦᱤᱨ ᱠᱷᱟᱫᱟᱱ',
    company: 'UCIL (Dept of Atomic Energy)',
    location: 'East Singhbhum, Jharkhand (झारखंड)',
    depth: '940 Meters (Deepest in Jharkhand)',
    hazardRating: 'Special High Risk',
    hazardType: 'Extreme Depth Geostatic Pressure, Toxic Gases & Rockburst',
    badgeColor: 'purple'
  }
];

// Multilingual Assessment Question Bank
export const ASSIGNMENT_QUESTIONS = {
  en: [
    {
      id: 'q1',
      question: 'What is the statutory explosive range of Methane (CH4) gas in an underground coal mine atmosphere?',
      options: [
        '0.1% to 1.5%',
        '5% to 15% (Most violent at ~9.5%)',
        '25% to 50%',
        '75% to 90%'
      ],
      correctAnswer: 1,
      explanation: 'Methane (Firedamp) is explosive between 5% and 15% in atmospheric air, with the most destructive explosion occurring at 9.5%.'
    },
    {
      id: 'q2',
      question: 'Within how many seconds must a miner don their Self-Contained Self-Rescuer (SCSR) breathing mask upon detecting Carbon Monoxide (CO)?',
      options: [
        'Within 10 minutes',
        'Within 60 seconds (Immediate Donning Protocol)',
        'After reaching the surface elevator',
        'Only if the flame safety lamp completely extinguishes'
      ],
      correctAnswer: 1,
      explanation: 'Under DGMS and CMR 2017 regulations, SCSR donning drills require miners to equip their chemical oxygen breathing apparatus in under 60 seconds.'
    },
    {
      id: 'q3',
      question: 'What is the primary role of Stone Dust Barriers installed in mine roadways?',
      options: [
        'To pave smooth walkway tracks for coal trolleys',
        'To disperse incombustible limestone dust that absorbs flame heat and quenches coal dust explosions',
        'To absorb floor water seepage',
        'To mark distance markers from the pit bottom'
      ],
      correctAnswer: 1,
      explanation: 'Stone dust barriers contain pulverized limestone dust that is dislodged by an explosion shockwave to smother the trailing flame front.'
    },
    {
      id: 'q4',
      question: 'If a mine fire breaks out in the inbye heading, along which airway must the underground crew evacuate?',
      options: [
        'Along the return airway carrying toxic smoke',
        'Directly towards the burning coal face',
        'Along the intake fresh airway following the tactile lifeline cable',
        'Sit and wait in the coal face without breathing apparatus'
      ],
      correctAnswer: 2,
      explanation: 'Miners must always evacuate along the fresh air intake roadway away from the smoke direction while holding the tactile lifeline rope.'
    },
    {
      id: 'q5',
      question: 'According to Coal Mines Regulations (CMR 2017), what minimum life support endurance must an Underground Refuge Chamber provide?',
      options: [
        'At least 48 Hours with breathable oxygen, food, water & wireless communication',
        '2 Hours only',
        '10 Minutes',
        '24 Days'
      ],
      correctAnswer: 0,
      explanation: 'A statutory mine refuge chamber provides sealed airtight life support, oxygen generation, and telecommunications for at least 48 hours for trapped miners.'
    }
  ],

  hi: [
    {
      id: 'q1',
      question: 'भूमिगत कोयला खदान में मीथेन (CH4) गैस की विस्फोटक सीमा (Explosive Range) क्या है?',
      options: [
        '0.1% से 1.5%',
        '5% से 15% (सबसे घातक विस्फोट लगभग 9.5% पर)',
        '25% से 50%',
        '75% से 90%'
      ],
      correctAnswer: 1,
      explanation: 'हवा में मीथेन की मात्रा 5% से 15% के बीच होने पर यह विस्फोटक बन जाती है, और 9.5% पर सबसे प्रचंड विस्फोट होता है।'
    },
    {
      id: 'q2',
      question: 'कार्बन मोनोऑक्साइड (CO) का रिसाव होने पर खनिक को कितने समय के भीतर SCSR ऑक्सीजन मास्क पहनना अनिवार्य है?',
      options: [
        '10 मिनट के भीतर',
        '60 सेकंड के भीतर (तत्काल सुरक्षा नियम)',
        'शाफ्ट लिफ्ट तक पहुंचने के बाद',
        'सिर्फ तभी जब बत्ती पूरी तरह बुझ जाए'
      ],
      correctAnswer: 1,
      explanation: 'DGMS नियमों के अनुसार कार्बन मोनोऑक्साइड से बचने के लिए खनिक को 60 सेकंड के भीतर SCSR मास्क पहन लेना चाहिए।'
    },
    {
      id: 'q3',
      question: 'खदान की गैलरी में स्टोन डस्ट बैरियर (चूना पत्थर धूल) लगाने का मुख्य उद्देश्य क्या है?',
      options: [
        'कोयले की गाड़ियों के लिए चिकना रास्ता बनाना',
        'कोयला धूल के आग-विस्फोट की ज्वाला को बुझाना और फैलने से रोकना',
        'खदान के पानी को सोखना',
        'रास्ते की दूरी नापना'
      ],
      correctAnswer: 1,
      explanation: 'स्टोन डस्ट अज्वलनशील चूना पत्थर होता है, जो विस्फोट के झटके से हवा में बिखर कर आग की लौ को ठंडा करके बुझा देता है।'
    },
    {
      id: 'q4',
      question: 'खदान में आग लगने की स्थिति में खनिकों को किस रास्ते से बाहर निकलना चाहिए?',
      options: [
        'जहरीले धुएं वाले रिटर्न एयरवे के रास्ते',
        'सुलगते हुए कोयले के सामने की ओर',
        'ताजी हवा वाले इनटेक एयरवे और लाइफलाइन रस्सी को पकड़ते हुए',
        'वहीं बैठकर इंतजार करना'
      ],
      correctAnswer: 2,
      explanation: 'खनिकों को हमेशा लाइफलाइन रस्सी पकड़ते हुए ताजी हवा वाले इनटेक एयरवे से बाहर निकलना चाहिए।'
    },
    {
      id: 'q5',
      question: 'कोयला खान विनियम (CMR 2017) के अनुसार भूमिगत रिफ्यूज चैंबर में कम से कम कितने समय का जीवन रक्षक प्रबंध होना चाहिए?',
      options: [
        'कम से कम 48 घंटे (ऑक्सीजन, पानी, भोजन एवं वायरलेस संचार सहित)',
        'केवल 2 घंटे',
        '10 मिनट',
        '24 दिन'
      ],
      correctAnswer: 0,
      explanation: 'नियमों के अनुसार रिफ्यूज चैंबर में फंसे खनिकों के लिए कम से कम 48 घंटे तक ऑक्सीजन और जीवन रक्षा की व्यवस्था होनी चाहिए।'
    }
  ],

  sat: [
    {
      id: 'q1',
      question: 'ᱠᱷᱟᱫᱟᱱ ᱵᱷᱤᱛᱨᱤ ᱨᱮ ᱢᱤᱛᱷᱮᱱ (CH4) ᱜᱮᱥ ᱛᱤᱱᱟᱹᱜ ᱛᱷᱚᱠ ᱨᱮ ᱯᱷᱩᱴᱟᱹᱣ (Explosive) ᱦᱩᱭᱩᱜᱼᱟ?',
      options: [
        '0.1% ᱠᱷᱚᱱ 1.5%',
        '5% ᱠᱷᱚᱱ 15% (ᱡᱚᱛᱚ ᱠᱷᱚᱱ ᱵᱟᱹᱲᱤᱡ ᱯᱷᱩᱴᱟᱹᱣ 9.5% ᱨᱮ)',
        '25% ᱠᱷᱚᱱ 50%',
        '75% ᱠᱷᱚᱱ 90%'
      ],
      correctAnswer: 1,
      explanation: 'ᱦᱚᱭ ᱨᱮ ᱢᱤᱛᱷᱮᱱ 5% ᱠᱷᱚᱱ 15% ᱵᱷᱤᱛᱨᱤ ᱨᱮ ᱛᱟᱦᱮᱸᱱ ᱠᱷᱟᱱ ᱯᱷᱩᱴᱟᱹᱣ ᱦᱩᱭᱩᱜᱼᱟ, 9.5% ᱨᱮ ᱡᱚᱛᱚ ᱠᱷᱚᱱ ᱢᱟᱨᱟᱝ ᱵᱤᱯᱚᱫᱽ ᱦᱩᱭᱩᱜᱼᱟ᱾'
    },
    {
      id: 'q2',
      question: 'ᱠᱟᱨᱵᱚᱱ ᱢᱚᱱᱳᱠᱥᱟᱭᱤᱰ (CO) ᱵᱤᱥ ᱦᱚᱭ ᱧᱟᱢ ᱞᱮᱱᱠᱷᱟᱱ ᱛᱤᱱᱟᱹᱜ ᱚᱠᱛᱚ ᱨᱮ SCSR ᱢᱟᱥᱠ ᱦᱚᱨᱚᱜᱽ ᱦᱩᱭᱩᱜᱼᱟ?',
      options: [
        '᱑᱐ ᱴᱤᱯᱤᱡ ᱵᱷᱤᱛᱨᱤ ᱨᱮ',
        '᱖᱐ ᱥᱮᱠᱮᱱᱰ ᱵᱷᱤᱛᱨᱤ ᱨᱮ (ᱞᱚᱜᱚᱱ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱱᱤᱭᱚᱢ)',
        'ᱞᱤᱯᱷᱴ ᱴᱷᱮᱱ ᱥᱮᱴᱮᱨ ᱠᱟᱛᱮ',
        'ᱫᱤᱭᱟᱹ ᱵᱟᱹᱛᱤ ᱤᱬᱤᱡ ᱛᱟᱭᱚᱢ'
      ],
      correctAnswer: 1,
      explanation: 'DGMS ᱱᱤᱭᱚᱢ ᱞᱮᱠᱟᱛᱮ ᱖᱐ ᱥᱮᱠᱮᱱᱰ ᱵᱷᱤᱛᱨᱤ ᱨᱮ SCSR ᱢᱟᱥᱠ ᱦᱚᱨᱚᱜᱽ ᱠᱟᱛᱮ ᱡᱤᱣᱤ ᱵᱟᱧᱪᱟᱣ ᱞᱟᱹᱠᱛᱤᱭᱟᱱᱟ᱾'
    },
    {
      id: 'q3',
      question: 'ᱠᱷᱟᱫᱟᱱ ᱨᱮ ᱫᱷᱤᱨᱤ ᱫᱷᱩᱲᱤ (Stone Dust Barrier) ᱞᱟᱜᱟᱣ ᱨᱮᱱᱟᱜ ᱢᱩᱬᱩᱛ ᱠᱟᱨᱚᱱ ᱪᱮᱫ?',
      options: [
        'ᱠᱩᱭᱞᱟᱹ ᱜᱟᱹᱰᱤ ᱪᱟᱞᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱥᱚᱡᱷᱮ ᱰᱟᱦᱟᱨ',
        'ᱠᱩᱭᱞᱟᱹ ᱫᱷᱩᱲᱤ ᱯᱷᱩᱴᱟᱹᱣ ᱟᱨ ᱥᱮᱸᱜᱮᱞ ᱟᱴᱠᱟᱣ ᱞᱟᱹᱜᱤᱫ',
        'ᱠᱷᱟᱫᱟᱱ ᱫᱟᱜ ᱨᱚᱦᱚᱲ ᱞᱟᱹᱜᱤᱫ',
        'ᱰᱟᱦᱟᱨ ᱨᱮᱱᱟᱜ ᱡᱤᱞᱤᱧ ᱢᱟᱯ ᱞᱟᱹᱜᱤᱫ'
      ],
      correctAnswer: 1,
      explanation: 'ᱫᱷᱤᱨᱤ ᱫᱷᱩᱲᱤ ᱫᱚ ᱵᱟᱝ ᱡᱩᱞᱩᱜᱼᱟ, ᱯᱷᱩᱴᱟᱹᱣ ᱡᱚᱠᱷᱟᱜ ᱱᱚᱶᱟ ᱯᱟᱥᱱᱟᱣ ᱠᱟᱛᱮ ᱥᱮᱸᱜᱮᱞ ᱤᱬᱤᱡ ᱜᱤᱰᱤᱭᱟᱭ᱾'
    },
    {
      id: 'q4',
      question: 'ᱠᱷᱟᱫᱟᱱ ᱨᱮ ᱥᱮᱸᱜᱮᱞ ᱞᱟᱜᱟᱣ ᱞᱮᱱᱠᱷᱟᱱ ᱚᱠᱟ ᱰᱟᱦᱟᱨ ᱛᱮ ᱚᱰᱚᱠᱚᱜ ᱞᱟᱹᱠᱛᱤᱭᱟᱱᱟ?',
      options: [
        'ᱵᱤᱥ ᱫᱷᱩᱶᱟᱸ ᱪᱟᱞᱟᱜ ᱠᱟᱱ ᱨᱤᱴᱚᱨᱱ ᱰᱟᱦᱟᱨ ᱛᱮ',
        'ᱡᱩᱞᱩᱜ ᱠᱟᱱ ᱠᱩᱭᱞᱟᱹ ᱥᱟᱢᱟᱝ ᱛᱮ',
        'ᱥᱟᱯᱷᱟ ᱦᱚᱭ ᱦᱤᱡᱩᱜ ᱠᱟᱱ ᱤᱱᱴᱮᱠ ᱰᱟᱦᱟᱨ ᱟᱨ ᱞᱟᱭᱤᱯᱷ-ᱞᱟᱭᱤᱱ ᱛᱟᱨ ᱥᱟᱵ ᱠᱟᱛᱮ',
        'ᱚᱸᱰᱮ ᱜᱮ ᱫᱩᱲᱩᱵ ᱛᱷᱤᱨ ᱠᱟᱛᱮ'
      ],
      correctAnswer: 2,
      explanation: 'ᱞᱟᱭᱤᱯᱷ-ᱞᱟᱭᱤᱱ ᱛᱟᱨ ᱥᱟᱵ ᱠᱟᱛᱮ ᱥᱟᱯᱷᱟ ᱦᱚᱭ ᱰᱟᱦᱟᱨ ᱛᱮᱜᱮ ᱵᱟᱦᱨᱮ ᱚᱰᱚᱠᱚᱜ ᱦᱩᱭᱩᱜᱼᱟ᱾'
    },
    {
      id: 'q5',
      question: 'ᱠᱩᱭᱞᱟᱹ ᱠᱷᱟᱫᱟᱱ ᱟᱹᱱ (CMR 2017) ᱞᱮᱠᱟᱛᱮ ᱨᱮᱯᱷᱤᱭᱩᱡᱽ ᱪᱮᱢᱵᱚᱨ ᱨᱮ ᱛᱤᱱᱟᱹᱜ ᱚᱠᱛᱚ ᱨᱮᱱᱟᱜ ᱚᱠᱥᱤᱡᱮᱱ ᱛᱟᱦᱮᱸᱱ ᱞᱟᱹᱠᱛᱤ?',
      options: [
        'ᱠᱚᱢ ᱠᱷᱚᱱ ᱠᱚᱢ ᱔᱘ ᱴᱟᱲᱟᱝ (ᱚᱠᱥᱤᱡᱮᱱ, ᱫᱟᱜ ᱟᱨ ᱡᱚᱢᱟᱜ ᱥᱟᱶ)',
        '᱒ ᱴᱟᱲᱟᱝ ᱥᱩᱢᱩᱝ',
        '᱑᱐ ᱴᱤᱯᱤᱡ',
        '᱒᱔ ᱢᱟᱦᱟᱸ'
      ],
      correctAnswer: 0,
      explanation: 'ᱟᱹᱱ ᱞᱮᱠᱟᱛᱮ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱪᱮᱢᱵᱚᱨ ᱨᱮ ᱠᱚᱢ ᱠᱷᱚᱱ ᱠᱚᱢ ᱔᱘ ᱴᱟᱲᱟᱝ ᱡᱤᱣᱤ ᱵᱟᱧᱪᱟᱣ ᱨᱮᱱᱟᱜ ᱵᱮᱵᱚᱥᱛᱟ ᱛᱟᱦᱮᱸᱱᱟ᱾'
    }
  ]
};

