export default class Likes {
    constructor(){
        this.items = [];
    }

    isLiked(id){
        const i = this.items.findIndex( el => el.id === id );
        if(i > -1) return true;
        return false;
    }

    addItem(id, img, title, publisher){
        const item = { id, img, title, publisher };
        this.items.push(item);
        this.persistData();
    }

    deleteItem(id){
        const i = this.items.findIndex( el => el.id === id );
        this.items.splice(i, 1);
        this.persistData();
    }

    getNumLikes() {
        return this.items.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.items));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        if (storage) this.items = storage;
    }
}