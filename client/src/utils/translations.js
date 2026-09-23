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
    
    // Gas Leak Simulation
    gasLeakTitle: '3D Underground Gas Leak & Toxic Atmosphere Drill',
    gasLeakSubtitle: 'Methane (CH4) & Carbon Monoxide (CO) Inrush Response',
    methaneLevel: 'Methane (CH4)',
    coLevel: 'Carbon Monoxide (CO)',
    gasSafe: 'Atmosphere Safe',
    gasHazard: 'EXPLOSIVE / TOXIC HAZARD DETECTED',
    stepSniffer: '1. Power on Methanometer Gas Sniffer',
    stepSnifferDesc: 'Scan the coal roof cavity for accumulated methane lighter than air.',
    stepSnifferAction: 'Activate Methanometer',
    stepSCSR: '2. Don SCSR Oxygen Breathing Mask',
    stepSCSRDesc: 'Equip the Self-Contained Self-Rescuer within 60 seconds to prevent CO poisoning.',
    stepSCSRAction: 'Don SCSR Mask',
    stepVent: '3. Deploy Ventilation Brattice Curtain',
    stepVentDesc: 'Direct fresh intake air into the heading to dilute methane below 1.25%.',
    stepVentAction: 'Unroll Brattice Curtain',
    stepEvacuate: '4. Guide Crew to Intake Fresh Airway',
    stepEvacuateDesc: 'Evacuate along the intake airway following the lifeline cable.',
    stepEvacuateAction: 'Complete Gas Evacuation',
    gasPassedToast: 'Outstanding! Gas leak successfully mitigated and crew safely evacuated.',
    
    // Fire & Explosion Simulation
    fireTitle: '3D Mine Fire & Coal Dust Explosion Suppression Drill',
    fireSubtitle: 'Spontaneous Combustion & Flamefront Mitigation',
    tempLevel: 'Heading Temperature',
    smokeDensity: 'Smoke Obscuration',
    fireSafe: 'Fire Zone Secured',
    fireDanger: 'ACTIVE MINE FIRE / EXPLOSION RISK',
    stepStoneDust: '1. Trigger Stone Dust Explosion Barrier',
    stepStoneDustDesc: 'Discharge incombustible limestone dust to quench coal dust explosion flame propagation.',
    stepStoneDustAction: 'Trip Stone Dust Barrier',
    stepDeluge: '2. Operate High-Pressure Water-Foam Monitor',
    stepDelugeDesc: 'Aim high-expansion foam directly at burning coal seam to smother combustion.',
    stepDelugeAction: 'Deploy Foam Cannon',
    stepFireDoor: '3. Seal Fire-Proof Explosion Stoppings',
    stepFireDoorDesc: 'Drop heavy steel fire doors to starve the fire of oxygen and contain toxic fumes.',
    stepFireDoorAction: 'Seal Explosion Doors',
    stepRefuge: '4. Move to Underground Refuge Chamber',
    stepRefugeDesc: 'Enter airtight refuge chamber equipped with 48-hour oxygen generation and telemetry.',
    stepRefugeAction: 'Enter Refuge Chamber',
    firePassedToast: 'Mine fire contained and crew secured inside the emergency refuge chamber!',
    
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
    
    // Gas Leak Simulation
    gasLeakTitle: '3D भूमिगत गैस रिसाव एवं जहरीली गैस ड्रिल',
    gasLeakSubtitle: 'मीथेन (CH4) एवं कार्बन मोनोऑक्साइड (CO) आपातकालीन प्रतिक्रिया',
    methaneLevel: 'मीथेन (CH4) स्तर',
    coLevel: 'कार्बन मोनोऑक्साइड (CO)',
    gasSafe: 'हवा सुरक्षित है',
    gasHazard: 'खतरा: विस्फोटक / जहरीली गैस का रिसाव!',
    stepSniffer: '1. मीथेनोमीटर गैस डिटेक्टर चालू करें',
    stepSnifferDesc: 'हवा से हल्की मीथेन गैस की जांच के लिए कोयले की छत पर डिटेक्टर लगाएं।',
    stepSnifferAction: 'मीथेनोमीटर सक्रिय करें',
    stepSCSR: '2. SCSR ऑक्सीजन श्वसन मास्क पहनें',
    stepSCSRDesc: 'कार्बन मोनोऑक्साइड से बचने के लिए 60 सेकंड के भीतर सेल्फ-रेस्क्यूअर मास्क पहनें।',
    stepSCSRAction: 'SCSR मास्क पहनें',
    stepVent: '3. वेंटिलेशन ब्रैटिस पर्दा लगाएं',
    stepVentDesc: 'मीथेन गैस को 1.25% से कम करने के लिए ताजी हवा के पर्दे को खोलें।',
    stepVentAction: 'पर्दा लगाएं',
    stepEvacuate: '4. ताजी हवा के रास्ते से सुरक्षित बाहर निकलें',
    stepEvacuateDesc: 'लाइफलाइन केबल को पकड़ते हुए सभी साथियों को सुरक्षित बाहर निकालें।',
    stepEvacuateAction: 'सुरक्षित निकासी पूरी करें',
    gasPassedToast: 'शाबाश! गैस रिसाव सफलतापूर्वक नियंत्रित हुआ और सभी खनिक सुरक्षित बाहर निकले।',
    
    // Fire & Explosion Simulation
    fireTitle: '3D खदान आग एवं कोयला धूल विस्फोट नियंत्रण ड्रिल',
    fireSubtitle: 'स्वतः दहन (Spontaneous Combustion) एवं अग्नि रोकथाम',
    tempLevel: 'खदान का तापमान',
    smokeDensity: 'धुएं की सघनता',
    fireSafe: 'आग क्षेत्र सुरक्षित',
    fireDanger: 'खतरा: भीषण आग एवं विस्फोट की आशंका!',
    stepStoneDust: '1. स्टोन डस्ट बैरियर (चूना पत्थर धूल) सक्रिय करें',
    stepStoneDustDesc: 'कोयला धूल के विस्फोट को रोकने के लिए अज्वलनशील चूना पत्थर धूल बैरियर गिराएं।',
    stepStoneDustAction: 'स्टोन डस्ट बैरियर गिराएं',
    stepDeluge: '2. हाई-प्रेशर वॉटर-फोम कैनन चलाएं',
    stepDelugeDesc: 'सुलगते कोयले पर सीधा फोम स्प्रे करें ताकि आग बुझाई जा सके।',
    stepDelugeAction: 'फोम कैनन चालू करें',
    stepFireDoor: '3. फायर-प्रूफ स्टील स्टॉपिंग दरवाजे बंद करें',
    stepFireDoorDesc: 'आग को ऑक्सीजन न मिले इसके लिए भारी स्टील दरवाजे बंद करें।',
    stepFireDoorAction: 'अग्नि दरवाजे बंद करें',
    stepRefuge: '4. भूमिगत रिफ्यूज चैंबर (शरण स्थल) में जाएं',
    stepRefugeDesc: '48 घंटे की ऑक्सीजन से लैस एयरटाइट रिफ्यूज चैंबर में सुरक्षित प्रवेश करें।',
    stepRefugeAction: 'रिफ्यूज चैंबर में प्रवेश करें',
    firePassedToast: 'खदान की आग पर नियंत्रण पाया गया और दल सुरक्षित रिफ्यूज चैंबर में पहुंच गया!',
    
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
    
    // Gas Leak Simulation
    gasLeakTitle: '3D ᱠᱷᱟᱫᱟᱱ ᱵᱷᱤᱛᱨᱤ ᱜᱮᱥ ᱞᱤᱠ ᱟᱨ ᱵᱤᱥ ᱦᱚᱭ ᱴᱨᱮᱱᱤᱝ',
    gasLeakSubtitle: 'ᱢᱤᱛᱷᱮᱱ (CH4) ᱟᱨ ᱠᱟᱨᱵᱚᱱ ᱢᱚᱱᱳᱠᱥᱟᱭᱤᱰ (CO) ᱵᱤᱯᱚᱫᱽ ᱥᱟᱦᱟᱭ',
    methaneLevel: 'ᱢᱤᱛᱷᱮᱱ (CH4) ᱛᱷᱚᱠ',
    coLevel: 'ᱠᱟᱨᱵᱚᱱ ᱢᱚᱱᱳᱠᱥᱟᱭᱤᱰ (CO)',
    gasSafe: 'ᱦᱚᱭ ᱵᱮᱥ ᱜᱮᱭᱟ (Safe)',
    gasHazard: 'ᱵᱤᱯᱚᱫᱽ: ᱯᱷᱩᱴᱟᱹᱣ ᱜᱮᱥ ᱟᱨ ᱵᱤᱥ ᱦᱚᱭ ᱧᱟᱢᱮᱱᱟ!',
    stepSniffer: '᱑. ᱢᱤᱛᱷᱮᱱᱳᱢᱤᱴᱟᱨ ᱰᱤᱴᱮᱠᱴᱚᱨ ᱪᱟᱹᱞᱩᱭ ᱢᱮ',
    stepSnifferDesc: 'ᱠᱩᱭᱞᱟᱹ ᱪᱷᱟᱛ ᱨᱮ ᱨᱟᱠᱟᱵ ᱟᱠᱟᱱ ᱢᱤᱛᱷᱮᱱ ᱜᱮᱥ ᱡᱟᱸᱪ ᱢᱮ᱾',
    stepSnifferAction: 'ᱰᱤᱴᱮᱠᱴᱚᱨ ᱪᱟᱹᱞᱩᱭ ᱢᱮ',
    stepSCSR: '᱒. SCSR ᱚᱠᱥᱤᱡᱮᱱ ᱥᱟᱦᱮᱫ ᱢᱟᱥᱠ ᱦᱚᱨᱚᱜᱽ ᱢᱮ',
    stepSCSRDesc: '᱖᱐ ᱥᱮᱠᱮᱱᱰ ᱵᱷᱤᱛᱨᱤ ᱨᱮ ᱥᱮᱞᱯᱷ-ᱨᱮᱥᱠᱤᱭᱩᱟᱨ ᱢᱟᱥᱠ ᱦᱚᱨᱚᱜᱽ ᱠᱟᱛᱮ ᱡᱤᱣᱤ ᱵᱟᱧᱪᱟᱣ ᱢᱮ᱾',
    stepSCSRAction: 'SCSR ᱢᱟᱥᱠ ᱦᱚᱨᱚᱜᱽ ᱢᱮ',
    stepVent: '᱓. ᱦᱚᱭ ᱪᱟᱞᱟᱣ ᱯᱚᱨᱫᱟ (Brattice) ᱛᱚᱞ ᱢᱮ',
    stepVentDesc: 'ᱢᱤᱛᱷᱮᱱ ᱜᱮᱥ ᱠᱚᱢᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱥᱟᱯᱷᱟ ᱦᱚᱭ ᱵᱷᱤᱛᱨᱤ ᱥᱮᱱ ᱵᱷᱮᱡᱟᱭ ᱢᱮ᱾',
    stepVentAction: 'ᱯᱚᱨᱫᱟ ᱛᱚᱞ ᱢᱮ',
    stepEvacuate: '᱔. ᱥᱟᱯᱷᱟ ᱦᱚᱭ ᱰᱟᱦᱟᱨ ᱛᱮ ᱚᱰᱚᱠᱚᱜ ᱢᱮ',
    stepEvacuateDesc: 'ᱞᱟᱭᱤᱯᱷ-ᱞᱟᱭᱤᱱ ᱛᱟᱨ ᱥᱟᱵ ᱠᱟᱛᱮ ᱥᱟᱱᱟᱢ ᱜᱟᱛᱮ ᱠᱚ ᱥᱟᱶ ᱵᱟᱦᱨᱮ ᱚᱰᱚᱠᱚᱜ ᱢᱮ᱾',
    stepEvacuateAction: 'ᱨᱩᱠᱷᱤᱭᱟᱹ ᱛᱮ ᱚᱰᱚᱠᱚᱜ ᱢᱮ',
    gasPassedToast: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ! ᱜᱮᱥ ᱵᱤᱯᱚᱫᱽ ᱥᱟᱦᱟᱭᱮᱱᱟ ᱟᱨ ᱥᱟᱱᱟᱢ ᱠᱟᱹᱢᱤᱭᱟᱹ ᱠᱚ ᱵᱟᱧᱪᱟᱣᱮᱱᱟ᱾',
    
    // Fire & Explosion Simulation
    fireTitle: '3D ᱠᱷᱟᱫᱟᱱ ᱥᱮᱸᱜᱮᱞ ᱟᱨ ᱫᱷᱩᱲᱤ ᱯᱷᱩᱴᱟᱹᱣ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱴᱨᱮᱱᱤᱝ',
    fireSubtitle: 'ᱠᱩᱭᱞᱟᱹ ᱥᱮᱸᱜᱮᱞ ᱟᱨ ᱯᱷᱩᱴᱟᱹᱣ ᱵᱚᱸᱫᱽ ᱠᱟᱹᱢᱤᱦᱚᱨᱟ',
    tempLevel: 'ᱠᱷᱟᱫᱟᱱ ᱞᱚᱞᱚ (Temperature)',
    smokeDensity: 'ᱫᱷᱩᱶᱟᱸ ᱛᱷᱚᱠ',
    fireSafe: 'ᱥᱮᱸᱜᱮᱞ ᱡᱟᱭᱜᱟ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱮᱱᱟ',
    fireDanger: 'ᱵᱤᱯᱚᱫᱽ: ᱢᱟᱨᱟᱝ ᱥᱮᱸᱜᱮᱞ ᱟᱨ ᱯᱷᱩᱴᱟᱹᱣ ᱦᱩᱭ ᱫᱟᱲᱮᱭᱟᱜᱼᱟ!',
    stepStoneDust: '᱑. ᱫᱷᱤᱨᱤ ᱫᱷᱩᱲᱤ (Stone Dust) ᱵᱮᱨᱤᱭᱟᱨ ᱯᱷᱩᱴᱟᱹᱣ ᱢᱮ',
    stepStoneDustDesc: 'ᱠᱩᱭᱞᱟᱹ ᱫᱷᱩᱲᱤ ᱯᱷᱩᱴᱟᱹᱣ ᱟᱴᱠᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱪᱩᱱ ᱫᱷᱤᱨᱤ ᱫᱷᱩᱲᱤ ᱯᱟᱥᱱᱟᱣ ᱢᱮ᱾',
    stepStoneDustAction: 'ᱫᱷᱤᱨᱤ ᱫᱷᱩᱲᱤ ᱵᱮᱨᱤᱭᱟᱨ ᱯᱷᱩᱴᱟᱹᱣ ᱢᱮ',
    stepDeluge: '᱒. ᱫᱟᱜ-ᱯᱷᱳᱢ ᱠᱮᱱᱚᱱ (Foam Cannon) ᱪᱟᱹᱞᱩᱭ ᱢᱮ',
    stepDelugeDesc: 'ᱞᱚᱞᱚ ᱠᱩᱭᱞᱟᱹ ᱪᱮᱛᱟᱱ ᱨᱮ ᱯᱷᱳᱢ ᱪᱷᱤᱴᱠᱟᱹᱣ ᱠᱟᱛᱮ ᱥᱮᱸᱜᱮᱞ ᱤᱬᱤᱡ ᱢᱮ᱾',
    stepDelugeAction: 'ᱯᱷᱳᱢ ᱠᱮᱱᱚᱱ ᱪᱟᱹᱞᱩᱭ ᱢᱮ',
    stepFireDoor: '᱓. ᱥᱮᱸᱜᱮᱞ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱢᱮᱬᱦᱮᱫ ᱫᱩᱣᱟᱹᱨ ᱵᱚᱸᱫᱽ ᱢᱮ',
    stepFireDoorDesc: 'ᱥᱮᱸᱜᱮᱞ ᱚᱠᱥᱤᱡᱮᱱ ᱟᱞᱚᱭ ᱧᱟᱢ ᱢᱟ ᱚᱱᱟ ᱞᱟᱹᱜᱤᱫ ᱫᱩᱣᱟᱹᱨ ᱠᱮᱴᱮᱡ ᱛᱮ ᱵᱚᱸᱫᱽ ᱢᱮ᱾',
    stepFireDoorAction: 'ᱫᱩᱣᱟᱹᱨ ᱵᱚᱸᱫᱽ ᱢᱮ',
    stepRefuge: '᱔. ᱠᱷᱟᱫᱟᱱ ᱵᱷᱤᱛᱨᱤ ᱨᱮᱯᱷᱤᱭᱩᱡᱽ ᱪᱮᱢᱵᱚᱨ (Refuge) ᱛᱮ ᱪᱟᱞᱟᱜ ᱢᱮ',
    stepRefugeDesc: '᱔᱘ ᱴᱟᱲᱟᱝ ᱚᱠᱥᱤᱡᱮᱱ ᱢᱮᱱᱟᱜ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱠᱳᱴᱷᱟ ᱵᱷᱤᱛᱨᱤ ᱨᱮ ᱵᱚᱞᱚᱱ ᱢᱮ᱾',
    stepRefugeAction: 'ᱨᱮᱯᱷᱤᱭᱩᱡᱽ ᱪᱮᱢᱵᱚᱨ ᱵᱚᱞᱚᱱ ᱢᱮ',
    firePassedToast: 'ᱥᱮᱸᱜᱮᱞ ᱤᱬᱤᱡ ᱮᱱᱟ ᱟᱨ ᱥᱟᱱᱟᱢ ᱠᱟᱹᱢᱤᱭᱟᱹ ᱠᱚ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱪᱮᱢᱵᱚᱨ ᱨᱮᱠᱚ ᱥᱮᱴᱮᱨ ᱮᱱᱟ!',
    
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

// Indian Coal & Mineral Mines Catalog
export const MINES_CATALOG = [
  {
    id: 'mine_jharia',
    name: 'Jharia Underground Coalfield Pit #4',
    nameHi: 'झरिया भूमिगत कोयला खदान पिट #4',
    nameSat: 'ᱡᱷᱟᱨᱤᱭᱟ ᱠᱩᱭᱞᱟᱹ ᱠᱷᱟᱫᱟᱱ ᱯᱤᱴ #᱔',
    company: 'Bharat Coking Coal Limited (BCCL)',
    location: 'Dhanbad, Jharkhand',
    depth: '420 Meters',
    hazardRating: 'Critical (Degree-III Gassy)',
    hazardType: 'Underground Methane Inrush & Spontaneous Coal Combustion',
    badgeColor: 'red'
  },
  {
    id: 'mine_raniganj',
    name: 'Raniganj Deep Colliery Seam VIII',
    nameHi: 'रानीगंज गहरी कोलियरी सीम VIII',
    nameSat: 'ᱨᱟᱹᱱᱤᱜᱚᱸᱡᱽ ᱜᱟᱹᱦᱤᱨ ᱠᱚᱞᱤᱭᱟᱨᱤ ᱥᱤᱢ VIII',
    company: 'Eastern Coalfields Limited (ECL)',
    location: 'Paschim Bardhaman, West Bengal',
    depth: '580 Meters',
    hazardRating: 'High (Degree-III Gassy)',
    hazardType: 'Coal Dust Explosion & High Ground Pressure',
    badgeColor: 'amber'
  },
  {
    id: 'mine_singrauli',
    name: 'Singrauli Mega Coal Pit & Incline',
    nameHi: 'सिंगरौली मेगा कोयला पिट एवं इनक्लाइन',
    nameSat: 'ᱥᱤᱝᱨᱳᱞᱤ ᱢᱮᱜᱟ ᱠᱩᱭᱞᱟᱹ ᱯᱤᱴ',
    company: 'Northern Coalfields Limited (NCL)',
    location: 'Singrauli, Madhya Pradesh',
    depth: '250 Meters',
    hazardRating: 'Moderate to High',
    hazardType: 'Blasting Gas Hazard, Toxic Carbon Monoxide & High Dust',
    badgeColor: 'blue'
  },
  {
    id: 'mine_korba',
    name: 'Korba Underground Gevra Colliery',
    nameHi: 'कोरबा भूमिगत गेवरा कोलियरी',
    nameSat: 'ᱠᱳᱨᱵᱟ ᱜᱮᱵᱷᱨᱟ ᱠᱚᱞᱤᱭᱟᱨᱤ',
    company: 'South Eastern Coalfields Limited (SECL)',
    location: 'Korba, Chhattisgarh',
    depth: '380 Meters',
    hazardRating: 'High (Degree-II Gassy)',
    hazardType: 'Spontaneous Heating & Conveyor Belt Friction Fire',
    badgeColor: 'emerald'
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

