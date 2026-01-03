// Result page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Load results from sessionStorage or localStorage
    loadResults();
});

function loadResults() {
    // First try to get results from sessionStorage
    let results = sessionStorage.getItem('quizResults');
    
    // If not in sessionStorage, try localStorage
    if (!results) {
        results = localStorage.getItem('quizResults');
    }
    
    if (results) {
        try {
            const quizResults = JSON.parse(results);
            displayResults(quizResults);
        } catch (e) {
            console.error('Error parsing quiz results:', e);
            displayErrorMessage();
        }
    } else {
        // If no results found, show a message
        displayNoResultsMessage();
    }
}

function displayResults(results) {
    // Update summary values
    document.getElementById('score-value').textContent = results.score || 0;
    document.getElementById('total-value').textContent = results.totalQuestions || 0;
    document.getElementById('correct-value').textContent = results.correctAnswers || 0;
    
    // Calculate and display percentage
    const percentage = results.percentage || 0;
    document.getElementById('percentage-value').textContent = `${percentage}%`;
    
    // Add performance indicator
    addPerformanceIndicator(percentage);
    
    // Display detailed results if available
    if (results.questions && results.userAnswers) {
        displayDetailedResults(results);
    }
    
    // Update the results title with category and difficulty if available
    if (results.category) {
        const resultsTitle = document.querySelector('.results-title');
        resultsTitle.textContent = `Quiz Results: ${results.category}`;
    }
}

function addPerformanceIndicator(percentage) {
    const resultsContainer = document.querySelector('.results-container');
    
    // Remove any existing performance indicator
    const existingIndicator = resultsContainer.querySelector('.performance-indicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    // Create performance indicator element
    const perfIndicator = document.createElement('div');
    perfIndicator.className = 'performance-indicator';
    
    // Determine performance message based on percentage
    let message = '';
    let messageClass = '';
    
    if (percentage >= 90) {
        message = 'Excellent Work!';
        messageClass = 'excellent';
    } else if (percentage >= 70) {
        message = 'Great Job!';
        messageClass = 'good';
    } else if (percentage >= 50) {
        message = 'Good Effort!';
        messageClass = 'average';
    } else {
        message = 'Keep Practicing!';
        messageClass = 'improve';
    }
    
    perfIndicator.innerHTML = `
        <div class="performance-score">${percentage}%</div>
        <div class="performance-message ${messageClass}">${message}</div>
        <p>You answered ${percentage}% of the questions correctly.</p>
    `;
    
    // Insert after the summary section
    const summarySection = document.querySelector('.results-summary');
    resultsContainer.insertBefore(perfIndicator, summarySection.nextSibling);
}

function displayDetailedResults(results) {
    const detailedResultsContainer = document.getElementById('detailed-results');
    
    if (!results.questions || !results.userAnswers) {
        return;
    }
    
    detailedResultsContainer.innerHTML = ''; // Clear existing content
    
    results.questions.forEach((question, index) => {
        const userAnswer = results.userAnswers[index];
        // For multiple choice questions, check if answer is correct
        let isCorrect = false;
        if (typeof question.answer === 'number' && userAnswer !== undefined) {
            isCorrect = userAnswer === question.answer;
        } else if (Array.isArray(question.answer) && Array.isArray(userAnswer)) {
            // For checkbox questions, check if arrays are equal
            isCorrect = question.answer.length === userAnswer.length && 
                       question.answer.every(val => userAnswer.includes(val));
        } else {
            isCorrect = userAnswer === question.answer;
        }
        
        const questionElement = document.createElement('div');
        questionElement.className = `question-result ${isCorrect ? 'correct' : 'incorrect'}`;
        
        // Handle different question types
        let userAnswerText = 'No answer selected';
        if (userAnswer !== undefined && userAnswer !== null) {
            if (Array.isArray(userAnswer)) {
                // For checkbox questions
                userAnswerText = userAnswer.map(ans => {
                    if (question.choices && question.choices[ans] !== undefined) {
                        return question.choices[ans];
                    }
                    return ans;
                }).join(', ');
            } else {
                // For single choice questions
                if (question.choices && question.choices[userAnswer] !== undefined) {
                    userAnswerText = question.choices[userAnswer];
                } else {
                    userAnswerText = userAnswer;
                }
            }
        }
        
        // Find the text of the correct answer
        let correctAnswerText = '';
        if (Array.isArray(question.answer)) {
            // For checkbox questions
            correctAnswerText = question.answer.map(ans => {
                if (question.choices && question.choices[ans] !== undefined) {
                    return question.choices[ans];
                }
                return ans;
            }).join(', ');
        } else {
            // For single choice questions
            if (question.choices && question.choices[question.answer] !== undefined) {
                correctAnswerText = question.choices[question.answer];
            } else {
                correctAnswerText = question.answer;
            }
        }
        
        questionElement.innerHTML = `
            <div class="question-text">${index + 1}. ${question.question || question.text}</div>
            <div class="user-answer ${isCorrect ? 'correct' : 'incorrect'}">
                <span class="answer-label">Your answer:</span> ${userAnswerText}
            </div>
            ${!isCorrect ? `<div class="correct-answer">
                <span class="answer-label">Correct answer:</span> ${correctAnswerText}
            </div>` : ''}
        `;
        
        detailedResultsContainer.appendChild(questionElement);
    });
}