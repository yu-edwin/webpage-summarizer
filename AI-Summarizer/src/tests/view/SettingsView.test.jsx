import React from "react";
import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";
import { SettingsView } from "../../view/SettingsView.jsx";
import { mockChromeStorageSync } from "../mockChrome.jsx";
import { render, renderHook, screen, fireEvent} from "@testing-library/react";

describe("SettingsView", () => {
    //. loading mocked chrome
    beforeAll(() =>{
        global.chrome = {}
        global.chrome.storage = {}
        global.chrome.storage.sync = mockChromeStorageSync;
    });

    // clear storage before each test case
    beforeEach(() => {
        chrome.storage.sync.reset();
    });

    it("tests for the initial values, should be OpenAI as provider and blank elsewhere", () => {
        render(<SettingsView />);
        expect(screen.getByRole("combobox").value).toBe("OpenAI");
        expect(screen.getAllByRole("textbox")[0].value).toBe("");
        expect(screen.getAllByRole("textbox")[1].value).toBe("");
    });

    it("tests the ProviderSelector, checking before and after changing provider", () => {
        render(<SettingsView />);

        // fireEvent.change();
    });
});

