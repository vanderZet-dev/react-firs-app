import React from "react";
import { create } from "react-test-renderer";
import { ProfileStatus } from "./ProfileStatus";

describe("Profile status component", () => {

    test("Status from props should be in the state", () => {
        const component = create(<ProfileStatus status="test status" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("test status");
    });

    test("After creation span should be displayed", () => {
        const component = create(<ProfileStatus status="test status" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });

    test("After creation input should not be displayed", () => {
        const component = create(<ProfileStatus status="test status" />);
        const root = component.root;

        expect(() => {
            root.findByType("input");
        }).toThrow();


    });

    test("After creation span should be contain correct status", () => {
        const component = create(<ProfileStatus status="test status" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("test status");
    });

    test("input should be displayed in edit mode instead of span", () => {
        const component = create(<ProfileStatus status="test status" />);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");

        expect(input.props.value).toBe("test status");
    });

    test("callback should be called", () => {

        const mockCallback = jest.fn();

        const component = create(<ProfileStatus status="test status" updateProfileStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.deActivateEditMode();

        expect(mockCallback.mock.calls.length).toBe(1);
    });
});