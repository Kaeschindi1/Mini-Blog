// Theme Switcher
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggle.textContent = '☀️ Light Mode';
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggle.textContent = '🌙 Dark Mode';
    }
    // Save theme preference
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Load saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggle.textContent = '☀️ Light Mode';
    }
});

// Comment System
const commentForm = document.getElementById('commentForm');
const commentInput = document.getElementById('commentInput');
const commentsContainer = document.getElementById('commentsContainer');

// Load comments from localStorage
let comments = JSON.parse(localStorage.getItem('blogComments')) || [];

// Display comments
function displayComments() {
    commentsContainer.innerHTML = '';
    comments.forEach((comment, index) => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <p>${escapeHTML(comment.text)}</p>
            <small>Posted on: ${comment.date}</small>
            <button onclick="deleteComment(${index})">Delete</button>
        `;
        commentsContainer.appendChild(commentElement);
    });
}

// Escape HTML to prevent XSS
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Add new comment
commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const commentText = commentInput.value.trim();
    
    if (commentText) {
        const newComment = {
            text: commentText,
            date: new Date().toLocaleString()
        };
        
        comments.push(newComment);
        localStorage.setItem('blogComments', JSON.stringify(comments));
        
        commentInput.value = '';
        displayComments();
    }
});

// Delete comment
function deleteComment(index) {
    comments.splice(index, 1);
    localStorage.setItem('blogComments', JSON.stringify(comments));
    displayComments();
}

// Initial display of comments
displayComments();