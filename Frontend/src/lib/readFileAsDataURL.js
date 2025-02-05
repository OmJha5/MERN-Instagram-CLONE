
export let readFileAsDataURL = async(file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if(typeof reader.result == "string") resolve(reader.result);
        }
        reader.readAsDataURL(file);
    })
}