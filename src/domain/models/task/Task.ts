import Title from "@/core/shared/value-objects/Title";
import Entity from "../Entity";
import Props from "./Props";;

export default class Task extends Entity {
    readonly title: Title;
    readonly description?: string;
    readonly finished: boolean;
    readonly userId: string;

    constructor({
        id,
        title,
        description,
        finished = false,
        userId
    }: Props) {
        super(id!);
        this.title = new Title(title);
        this.description = description;
        this.finished = finished;
        this.userId = userId;
    }
}