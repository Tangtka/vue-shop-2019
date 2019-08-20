const tool = {
    isNull:(value)=>{
        switch (typeof value) {
            case 'undefined':
            case 'string':
                if(value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length === 0){
                    return true
                }
                break;
            case 'object':
                if (null === value || value.length === 0) return true;
                if(Object.keys(value).length === 0){
                    return true
                }
                break;
        }
        return false;
    }
};

export default tool;