const progressBar = document.querySelector('.progress-bar');
    progressText = document.querySelector('.progress-text');

const progress = (value) => {
    const percentage = (value / 10) * 100;
    progressBar.style.width = `${percentage}%`;
    progressText.innerHTML= `${value}`;
}