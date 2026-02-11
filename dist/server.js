"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 3000;
// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '../views'));
// Serve static files (CSS, compiled JS)
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(express_1.default.static(path_1.default.join(__dirname)));
// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Greeting Page',
        description: 'Enter your name to get a personalized greeting'
    });
});
app.get('/counter', (req, res) => {
    res.render('counter', {
        title: 'Click Counter',
        description: 'Click the button to increment the counter'
    });
});
app.get('/history', (req, res) => {
    res.render('history', {
        title: 'Greeting History',
        description: 'View all the names that have been greeted'
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop');
});
//# sourceMappingURL=server.js.map