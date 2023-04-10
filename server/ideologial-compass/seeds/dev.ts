import { Knex } from "knex";
import { Guid } from "guid-typescript";
import { Category, Ideology, IdeologyAnswer, Question, Survey } from "../src/client";

let _categoryList: Category[] = [];
let _ideologyList: Ideology[] = [];
let _ideologyAnswerList: IdeologyAnswer[] = [];
let _questionList: Question[] = [];
let _surveyList: Survey[] = [];

let _categoryIds: string[] = [];
let _ideologyIds: string[] = [];
let _ideologyAnswerIds: string[] = [];
let _questionIds: string[] = [];
let _surveyIds: string[] = [];

for(let i = 0; i < 5; i++) {
    _categoryIds.push(Guid.create().toString());
    _ideologyIds.push(Guid.create().toString());
    _ideologyAnswerIds.push(Guid.create().toString());
    _questionIds.push(Guid.create().toString());
    _surveyIds.push(Guid.create().toString());
}

export async function seed(knex: Knex): Promise<void> {
    createEntities();

    await seedCategories(knex);
    await seedIdeologies(knex);
    await seedIdeologyAnswers(knex);
    await seedQuestions(knex);
    await seedSurveys(knex);
};

const createEntities = () => {
    createCategories();
    createIdeologies();
    createIdeologyAnswers();
    createQuestions();
    createSurveys();
};


const createCategories = () => {
    _categoryList.push({ id: _categoryIds[0], name: "dev_category-1" });
    _categoryList.push({ id: _categoryIds[1], name: "dev_category-2" });
    _categoryList.push({ id: _categoryIds[2], name: "dev_category-3" });
    _categoryList.push({ id: _categoryIds[3], name: "dev_category-4" });
    _categoryList.push({ id: _categoryIds[4], name: "dev_category-5" });
}

const createIdeologies = () => {
    _ideologyList.push({
        id: _ideologyIds[0],
        name: "dev_ideology-1",
        referenceLinks: ["reference-1", "reference-2"],
        description: "ideology one"
    });
    _ideologyList.push({
        id: _ideologyIds[1],
        name: "dev_ideology-2",
        referenceLinks: ["reference-1", "reference-2"],
        description: "ideology two"
    });
    _ideologyList.push({
        id: _ideologyIds[2],
        name: "dev_ideology-3",
        referenceLinks: ["reference-1", "reference-2"],
        description: "ideology three"
    });
    _ideologyList.push({
        id: _ideologyIds[3],
        name: "dev_ideology-4",
        referenceLinks: ["reference-1", "reference-2"],
        description: "ideology four"
    });
    _ideologyList.push({
        id: _ideologyIds[4],
        name: "dev_ideology-5",
        referenceLinks: ["reference-1", "reference-2"],
        description: "ideology five"
    });
}

const createIdeologyAnswers = () => {
    _ideologyAnswerList.push({ id: _ideologyAnswerIds[0], text: "answer-1", ideologyId: _ideologyIds[0], questionId: _questionIds[0], categoryId: _categoryIds[0] });
    _ideologyAnswerList.push({ id: _ideologyAnswerIds[1], text: "answer-2", ideologyId: _ideologyIds[0], questionId: _questionIds[1], categoryId: _categoryIds[1] });
    _ideologyAnswerList.push({ id: _ideologyAnswerIds[2], text: "answer-3", ideologyId: _ideologyIds[1], questionId: _questionIds[0], categoryId: _categoryIds[0] });
    _ideologyAnswerList.push({ id: _ideologyAnswerIds[3], text: "answer-4", ideologyId: _ideologyIds[1], questionId: _questionIds[1], categoryId: _categoryIds[1] });
    _ideologyAnswerList.push({ id: _ideologyAnswerIds[4], text: "answer-5", ideologyId: _ideologyIds[2], questionId: _questionIds[0], categoryId: _categoryIds[0] });
}

const createQuestions = () => {
    _questionList.push({
        id: _questionIds[0],
        text: "question-1",
        categoryId: _categoryIds[0]
    });
    _questionList.push({
        id: _questionIds[1],
        text: "question-2",
        categoryId: _categoryIds[1]
    });
}

const createSurveys = () => {
    _surveyList.push({
        id: _surveyIds[0],
        rootQuestions: [
            { questionId: _questionIds[0], priority: 0 },
            { questionId: _questionIds[1], priority: 1 }
        ]
    });
}

const seedCategories = async (knex: Knex) => {
    // Deletes ALL existing entries
    await knex("category").del();

    // Inserts seed entries
    await knex("category").insert(_categoryList);
};

const seedIdeologies = async (knex: Knex) => {
    // Deletes ALL existing entries
    await knex("ideology").del();

    // Inserts seed entries
    await knex("ideology").insert(_ideologyList.map(ideology => ({
        ...ideology,
        referenceLinks: JSON.stringify(ideology.referenceLinks),  // sqlite needs it to be a string
    })));
};

const seedIdeologyAnswers = async (knex: Knex) => {
    // Deletes ALL existing entries
    await knex("ideology-answer").del();

    // Inserts seed entries
    await knex("ideology-answer").insert(_ideologyAnswerList);
};

const seedQuestions = async (knex: Knex) => {
    // Deletes ALL existing entries
    await knex("question").del();

    // Inserts seed entries
    await knex("question").insert(_questionList);
};

const seedSurveys = async (knex: Knex) => {
    // Deletes ALL existing entries
    await knex("survey").del();

    // Inserts seed entries
    await knex("survey").insert(_surveyList.map(survey => ({
        ...survey,
        rootQuestions: JSON.stringify(survey.rootQuestions), // sqlite needs it to be a string
    })));
};

