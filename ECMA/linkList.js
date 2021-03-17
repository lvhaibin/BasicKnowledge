class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insertAtBeginning = (data) => {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;

        return this.head;
    }

    insertAtEnd = (data) => {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            return this.head;
        }

        let curNode = this.head;

        while(curNode.next) {
            curNode = curNode.next
        }

        curNode.next = newNode;
        return this.head;
    }

    getAt = index => {
        let count = 0;
        let node = this.head;

        while(node) {
            if (count === index) {
                return node;
            }
            count++;
            node = node.next;
        }
        return null;
    }

    insertAt = (index, data) => {
        if(!this.head) {
            this.head = new Node(data);
        } else if (index === 0) {
            this.head = new Node(data, this.head);
        } else {
            const previous = this.getAt(index - 1);
            const newNode = new Node(data);
            newNode.next = previous.next;
            previous.next = newNode;
        }
        return this.head;
    }

    deleteFirstNode = () => {
        if(!this.head) {
            return null;
        }
        this.head = this.head.next;
        return this.head;
    }
}

let list = new LinkedList();

list.insertAtBeginning({a: 10})
list.insertAtEnd({b: 20})
list.insertAtEnd({c: 30})

console.log(JSON.stringify(list));
console.log(JSON.stringify(list.getAt(1)));
