class DataTableConfigFactory {
    constructor() {

    }

    build(data) {
        switch (data) {
            case 'DATA-TABLE-USER-VISUALIZATION':
                return this.configTableUserVisualisation();
            default:
                throw new Error('Configuration not exists!');

        }
    }

    configTableUserVisualisation() {
        return {
            showCount: true,
            showOptions: true,
            showOptionsTYPE: 'DEFAULT',
            showSearch: false,
            showHeaderOptions: false,
            showRowPerPage: true,
            showPagination: false,
            searchBy: "",
            columns: [
                { name: "pictureUrl", title: "table_view_user_photo", width: "10%" },
                { name: "firstName", title: "table_view_user_firstname", formatter: undefined },
                { name: "lastName", title: "table_view_user_lastname", formatter: undefined },
                { name: "email", title: "table_view_user_email", formatter: undefined },

            ]
        };
    }

}

const instance = new DataTableConfigFactory();
export default instance;