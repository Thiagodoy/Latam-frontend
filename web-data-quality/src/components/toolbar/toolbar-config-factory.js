class ToolbarConfigFactory {
    constructor() {}

    build(key) {
        switch (key) {
            case 'TOOLBAR-USER-VISUALIZATION':
                return this.configToolbarUserVisualization();
            case 'TOOLBAR-COMPANY-VISUALIZATION':
                return this.configToolbarCompanyVisualization();
            case 'TOOLBAR-USER-VIEW-VISUALIZATION':
                return this.configToolbarUserViewVisualization();
            case 'TOOLBAR-FILE-VISUALIZATION':
                return this.configToolbarFileVisualization();
            case 'TOOLBAR-GROUP-VISUALIZATION':
                return this.configToolbarGroupVisualization();
            case 'TOOLBAR-BACK':
                return this.configToolbarBack();
            default:
                throw new Error('Configuration not exists!');
        }
    }

    configToolbarBack() {
        return {
            buttons: [
                { emit: 'back', class: 'btn-add-user', icon: 'fas fa-arrow-circle-left', label: 'button_back' },
            ],
            filter: []
        }
    }

    configToolbarUserViewVisualization() {
        return {
            buttons: [
                { emit: 'back', class: 'btn-add-user', icon: 'fas fa-arrow-circle-left', label: 'button_back' },
                { emit: 'edit', class: 'btn-add-user', icon: 'fas fa-pen mr-3', label: 'button_edit' },
                { emit: 'delete', class: 'btn-add-user', icon: 'far fa-times-circle', label: 'button_delete' }
            ],
            filter: []
        }
    }
    configToolbarFileVisualization() {
        return {
            buttons: [
                { emit: 'upload', class: 'btn-add-user', icon: 'fas fa-file-import', label: 'button_upload' , ability:{action:'upload', subject:'File'} }
            ],
            filter: []
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

    configToolbarCompanyVisualization() {
        return {
            buttons: [
                { emit: 'new', class: 'btn-add-user', icon: 'fas fa-user-plus', label: 'button_new' }
            ],
            filter: [
                { label: 'table_view_file_company_name', attribute: 'name' },
                { label: 'table_view_file_company_code', attribute: 'code' },

            ]

        };
    }

    configToolbarGroupVisualization() {
        return {
            buttons: [
                { emit: 'new', class: 'btn-add-user', icon: 'fas fa-user-plus', label: 'button_new' }
            ],
            filter: [
                { label: 'table_view_group_type', attribute: 'type' },
                { label: 'table_view_group_name', attribute: 'name' }
            ]

        };
    }
}

const instance = new ToolbarConfigFactory();
export default instance;