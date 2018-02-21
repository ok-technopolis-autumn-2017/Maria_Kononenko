function TodoModel(id, text, completed) {
    return {
        "id": id,
        "text": text,
        "completed": completed
    }
}

module.exports = TodoModel;