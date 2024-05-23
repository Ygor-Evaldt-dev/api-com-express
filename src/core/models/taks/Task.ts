import Entity from "../Entity";
import Props from "./Props";;

export default class Taks extends Entity {
    readonly title: string;
    readonly description: string;
    readonly finished: boolean;

    constructor({
        id,
        title,
        description,
        finished
    }: Props) {
        super(id!);
        this.title = title;
        this.description = description;
        this.finished = finished;
    }
}