from app import app

@app.route('/')
@app.route('/index')
def index():

    folders = {
        "school" : ['desk', 'pencil', 'professor'],
        "names" : ['Ikrom', 'Arabella', 'Colleen', 'Numonov'],
        "food" : ['pizza', 'cantaloupe', 'chicken', 'stawberry']
    }
    return folders


