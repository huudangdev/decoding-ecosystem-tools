const {Command, flags} = require('@oclif/command');
const {Todo} = require('../db');

class RemoveCommand extends Command {
    async run() {
        const {
            flags: {id},
        } = this.parse(RemoveCommand);
        const res = await Todo.remove({
            id: parseInt(id, 10)
        }).write();
        this.log(res);
    }
}

RemoveCommand.description = `
    Removes a task by id
    ...
    Removes a task permanently from database by id
`

RemoveCommand.flags = {
    id: flags.string({char: 'n', description: 'task id', required: true})
}

module.exports = RemoveCommand;