class MockFactory {
    constructor() {
        this.mockImage = `<img class="img-fluid rounded-circle avatar-view" style="max-width: 30%;max-height: 30%;"  src="{source}"/>`;
    }
    build(key, params) {

        switch (key) {
            case 'MOCK_IMAGE_PROFILE':
                return this.getMockImageProfile();
            case 'MAKE_IMAGE_PROFILE':
                return this.makeImageProfile(params);
            case 'MAKE_IMAGE_STATUS':
                    return this.makeImageStatus(params);    
            default:
                throw new Error('Not found a option!');
        }

    }

    makeImageStatus(param) {
        return param == 'VALIDATION_ERROR' ? '<div src="..." alt="..." class="rounded-circle text-primary" style="height:25px;width:25px; background-color:red;" />' : 
        param == 'VALIDATION_SUCCESS' ? '<div src="..." alt="..." class="rounded-circle text-primary" style="height:25px;width:25px; background-color:green;" />' : 
        '<div src="..." alt="..." class="rounded-circle text-primary" style="height:25px;width:25px; background-color:blue;" />'  
    }

    makeImageProfile(image) {
        return this.mockImage.replace('{source}', image)
    }
    getMockImageProfile() {
        return this.mockImage.replace('{source}', 'data:image/jpeg;base64,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');
    }
}

const instance = new MockFactory();
export default instance;