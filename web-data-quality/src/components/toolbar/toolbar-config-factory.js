class ToolbarConfigFactory {
    constructor() {}

    build(key) {
        switch (key) {
            case 'TOOLBAR-USER-VISUALIZATION':
                return this.configToolbarUserVisualization();
            default:
                throw new Error('Configuration not exists!');
        }
    }
    configToolbarUserVisualization() {
        return {
            buttons: [
                { emit: 'new', class: 'btn-add-user', icon: 'fas fa-user-plus', label: 'button_new' }
            ],
            filter: [
                { label: 'table_view_user_firstname', attribute: 'firstName' },
                { label: 'table_view_user_lastname', attribute: 'lastName' },
                { label: 'table_view_user_email', attribute: 'email' }
            ]

        };
    }
}

const instance = new ToolbarConfigFactory();
export default instance;