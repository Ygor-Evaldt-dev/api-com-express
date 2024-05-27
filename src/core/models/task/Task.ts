import SimpleTitle from "@/core/shared/value-objects/SimpleTitle";
import Entity from "../Entity";
import Props from "./Props";;

export default class Task extends Entity {
    readonly title: SimpleTitle;
    readonly description?: string;
    readonly finished: boolean;

    constructor({
        id,
        title,
        description,
        finished = false
    }: Props) {
        super(id!);
        this.title = new SimpleTitle(title);
        this.description = description;
        this.finished = finished;
    }
}