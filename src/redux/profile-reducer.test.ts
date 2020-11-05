import { PostType } from "../types/Profile/PostType";
import { ProfileModuleType } from "../types/Profile/ProfileModuleType";
import { addPost, deletePost, profileReducer } from "./profile-reducer";


const posts: Array<PostType> = [
    { id: 1, content: 'Hi, how are you?', likesCount: 18 },
    { id: 2, content: "It's my first post 1", likesCount: 5 },
    { id: 3, content: "It's my first post 2", likesCount: 3 },
    { id: 4, content: "It's my first post 3", likesCount: 1 }
];

const initialState: ProfileModuleType = {
    profile: null,
    profileStatus: 'По умолчанию',
    posts: posts,
    isFetching: false
};

it('length of posts should be decremented after delete one by id', () => {

    let action = deletePost(1);

    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(3);
});

it('length of posts should be incremented after add new post', () => {

    let action = addPost("some new post name");

    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(5);
});