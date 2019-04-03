class DataTableConfigFactory {
    constructor() {

    }

    build(data) {
        switch (data) {
            case 'DATA-TABLE-USER-VISUALIZATION':
                return this.configTableUserVisualisation();
            case 'DATA-TABLE-FILE-VISUALIZATION':
                return this.configTableFileVisualisation();
            case 'DATA-TABLE-GROUP-VISUALIZATION':
                return this.configTableGroupVisualization();
            default:
                throw new Error('Configuration not exists!');

        }
    }

    configTableFileVisualisation() {
        return {
            showCount: true,
            showOptions: true,
            showOptionsTYPE: 'FILE',
            showSearch: false,
            showHeaderOptions: false,
            showRowPerPage: false,
            showPagination: false,
            searchBy: "",
            columns: [
                { name: "company", title: "table_view_file_company_name" },
                { name: "name", title: "table_view_file_name" },
                { name: "date", title: "table_view_file_company_data" },
                {
                    name: "status",
                    title: "table_view_file_company_status",
                    formatter: (v) => {

                        switch (v) {
                            case 'NEW':
                                return `<div class="progress">
                                            <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                                        </div>`;
                            case 'PROCESSING':
                                return '<div class="spinner-grow text-primary" role="status"><span class="sr-only">20%</span></div>'
                            case 'UPLOADED':
                                return '<div src="..." alt="..." class="rounded-circle text-primary" style="height:25px;width:25px; background-color:green;"/>'
                            case 'ERROR':
                                return '<div src="..." alt="..." class="rounded-circle" style="height:25px;width:25px; background-color:red;"/>'
                        }
                    }
                },

                //{ name: "loading", title: "table_view_user_firstname", formatter: undefined },             
            ]
        };


    }
    configTableGroupVisualization() {

        return {
            showCount: true,
            showOptions: true,
            showOptionsTYPE: 'DEFAULT',
            showSearch: false,
            showHeaderOptions: false,
            showRowPerPage: false,
            showPagination: true,
            searchBy: "",
            columns: [
                { name: "name", title: "table_view_group_name", formatter: undefined },
                { name: "rev", title: "table_view_group_rev", formatter: undefined },
                { name: "type", title: "table_view_group_type", formatter: undefined },
            ]
        };

    }
    configTableUserVisualisation() {
        return {
            showCount: true,
            showOptions: true,
            showOptionsTYPE: 'DEFAULT',
            showSearch: false,
            showHeaderOptions: false,
            showRowPerPage: false,
            showPagination: true,
            searchBy: "",
            columns: [
                { name: "picture", title: "table_view_user_photo", width: "10%" },
                { name: "firstName", title: "table_view_user_firstname", formatter: undefined },
                { name: "lastName", title: "table_view_user_lastname", formatter: undefined },
                { name: "email", title: "table_view_user_email", formatter: undefined },

            ]
        };
    }

}

const instance = new DataTableConfigFactory();
export default instance;