from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/modulo')
def modulo():
    return render_template('modulo.html')

@app.route('/modulo2')
def modulo2():
    return render_template('modulo2.html')

@app.route('/modulo3')
def modulo3():
    return render_template('modulo3.html')

@app.route('/quiz1')
def quiz1():
    return render_template('quiz1.html')

@app.route('/quiz2')
def quiz2():
    return render_template('quiz2.html')

@app.route('/quiz3')
def quiz3():
    return render_template('quiz3.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)