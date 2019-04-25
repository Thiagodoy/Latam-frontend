import { dateTime } from '../../filter/date'
class DataTableConfigFactory {
    constructor() {

    }

    build(data) {
        switch (data) {
            case 'DATA-TABLE-USER-VISUALIZATION':
                return this.configTableUserVisualisation();
            case 'DATA-TABLE-COMPANY-VISUALIZATION':
                return this.configTableCompanyVisualisation();    
            case 'DATA-TABLE-FILE-VISUALIZATION':
                return this.configTableFileVisualisation();
            case 'DATA-TABLE-GROUP-VISUALIZATION':
                return this.configTableGroupVisualization();
            case 'DATA-TABLE-FILE-STATUS-VISUALIZATION':
                return this.configTableFileStatusVisualization();
            case 'DATA-TABLE-FILE-INFORMATION-VISUALIZATION':
                return this.configTableFileInformationVisualization();
            case 'DATA-TABLE-RELATORIO-VISUALIZATION':
            return this.configTableRelatorioVisualisation();
           
           
                default:
                throw new Error('Configuration not exists!');

        }
    }

    configTableFileInformationVisualization() {
        return {
            showCount: false,
            showOptions: true,
            showOptionsTYPE: 'FILE-DETAIL',
            showSearch: false,
            showHeaderOptions: false,
            showRowPerPage: false,
            showPagination: false,
            searchBy: "",
            columns: [
                { name: "information", title: "table_view_information", formatter: undefined },
                { name: "value", title: "table_view_empty", formatter: undefined },

            ]
        };


    }

    configTableFileStatusVisualization() {
        return {
            showCount: false,
            showOptions: true,
            showOptionsTYPE: 'FILE-DETAIL',
            showSearch: false,
            showHeaderOptions: false,
            showRowPerPage: false,
            showPagination: false,
            searchBy: "",
            columns: [
                { name: "fieldName", title: "table_file_status_fieldname", formatter: undefined },
                { name: "qtdErrors", title: "table_file_status_qtdErrors", formatter: undefined },
                { name: "qtdTotalLines", title: "table_file_status_qtdTotalLines", formatter: undefined },
                { name: "percentualError", title: "table_file_status_percentualError", formatter: (value) => { return `${value}%` } },
                { name: "percentualHit", title: "table_file_status_percentualHit", formatter: (value) => { return `${value}%` } },

            ]
        };
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
                { name: "createdDate", title: "table_view_file_company_data", formatter: (value) => { return dateTime(value) } },
                {
                    name: "status",
                    title: "table_view_file_company_status",
                    formatter: (v) => {

                        switch (v) {
                            case 'PROCESSING':
                                return '<div src="..." alt="..." class="spinner-grow text-warning" style="height:25px;width:25px; background-color:#ffc107;"/>'
                            case 'SUCCESS':
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

    configTableRelatorioVisualisation() {
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
                { name: "createdDate", title: "table_view_file_company_data", formatter: (value) => { return dateTime(value) } },
                {
                    name: "status",
                    title: "table_view_file_company_status",
                    formatter: (v) => {

                        switch (v) {
                            case 'PROCESSING':
                                return '<div src="..." alt="..." class="spinner-grow text-warning" style="height:25px;width:25px; background-color:#ffc107;"/>'
                            case 'SUCCESS':
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

    configTableCompanyVisualisation() {
        return {
            showCount: true,
            showOptions: true,
            showOptionsTYPE: 'DEFAULT',
            showSearch: false,
            showHeaderOptions: false,
            showRowPerPage: false,
            showPagination: false,
            searchBy: "",
            columns: [
                { name: "name", title: "table_agency_name", width: "10%" },
                { name: "inputPath", title: "table_agency_input_path", formatter: undefined },
                { name: "processedPath", title: "table_agency_processed_path", formatter: undefined },
                { name: "localFilePath", title: "table_agency_local_file_path", formatter: undefined },
                { name: "agencyCode", title: "table_agency_code", formatter: undefined },
                { name:  "odFlag", title: "table_Agency_od_flag", formatter: undefined },
                { name: "flagMonthly", title: "table_agency_flag_monthly", formatter: undefined },
                { name:  "flagApproved", title: "table_agency_flag_approved", formatter: undefined },

            ]
        };
    }

}

const instance = new DataTableConfigFactory();
export default instance;




