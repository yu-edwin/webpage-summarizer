import React from "react";
import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import SettingsView from "../../view/SettingsView.jsx";
import { mockChrome } from "../mocks.js";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

/**
 * Test cases for SettingsView, tests for:
 * simulating events for updating the elemnts in SettingsView.
 */
describe("test cases for SettingsView usage", () => {
    //. loading mocked chrome
    beforeAll(() =>{
        global.chrome = mockChrome
    });

    // clear storage before each test case
    beforeEach(() => {
        chrome.storage.sync.reset();
        cleanup();
    });

    it("tests for the initial values, should be OpenAI as provider and blank elsewhere", () => {
        render(<SettingsView />);
        expect(screen.getByRole("combobox").value).toBe("OpenAI");
        expect(screen.getAllByRole("textbox")[0].value).toBe("");
        expect(screen.getAllByRole("textbox")[1].value).toBe("");
    });

    it("tests the ProviderSelector, checking before after changing provider", () => {
        render(<SettingsView />);
        const providerSelector = screen.getByRole("combobox");
        expect(providerSelector.value).toBe("OpenAI");

        fireEvent.change(providerSelector, { target: { value: 'Anthropic' } });
        setTimeout(() => {
            expect(providerSelector.value).toBe('Anthropic');
        }, 50);
    });

    it("tests for KeyInput, checking before and after change", () => {
        render(<SettingsView />);
        const keyInput = screen.getAllByRole("textbox")[0];
        expect(keyInput.value).toBe("");

        fireEvent.change(keyInput, { target: { value: 'expected1' } });
        setTimeout(() => {
            expect(keyInput.value).toBe('expected1');
        }, 50);
    });

    it("tests for systemPromptInput, checking before and after change", () => {
        render(<SettingsView />);
        const systemPromptInput = screen.getAllByRole("textbox")[1];
        expect(systemPromptInput.value).toBe("");

        fireEvent.change(systemPromptInput, { target: { value: 'expected1' } });
        setTimeout(() => {
            expect(systemPromptInput.value).toBe('expected1');
        }, 50);
    });

    it("tests for changing provider and updating key functionality", () => {
        render(<SettingsView />);
        const providerSelector = screen.getByRole("combobox");
        expect(providerSelector.value).toBe("OpenAI");
        const keyInput = screen.getAllByRole("textbox")[0];
        expect(keyInput.value).toBe("");

        fireEvent.change(keyInput, { target: { value: 'expected1' } });
        fireEvent.change(providerSelector, { target: { value: 'Anthropic' } });

        setTimeout(() => {
            expect(keyInput.value).toBe("");
        }, 50);
    });
});

