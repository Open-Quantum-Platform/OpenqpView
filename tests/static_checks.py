from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read(name: str) -> str:
    return (ROOT / name).read_text()


def test_unified_input_panel_controls_exist():
    html = read("index.html")
    assert 'id="fileDrop"' in html
    assert 'class="data-input-panel file-drop"' in html
    assert 'id="logFileInput"' in html
    assert 'id="pasteDataInput"' in html
    assert 'id="loadPastedData"' in html
    assert 'id="clearPastedData"' in html
    assert 'aria-label="Paste molecular data"' in html
    assert "or drop/paste OpenQP log, XYZ, JSON, Molden, or cube data" in html


def test_paste_loader_reuses_file_parsing_order():
    js = read("app.js")
    assert "function loadTextByFormat" in js
    assert "function loadPastedData" in js
    assert "pasteDataInput" in js
    for marker in ["loadCubeText", "loadMoleculeJsonText", "loadXyzText", "loadMoldenText", "loadOpenQpLogText"]:
        assert marker in js


def test_paste_controls_have_styles():
    css = read("styles.css")
    assert ".paste-data-input" in css
    assert ".paste-actions" in css
    assert ".paste-hint" in css
    assert ".data-input-panel" in css
    assert ".file-picker-button" in css


if __name__ == "__main__":
    for test in [test_unified_input_panel_controls_exist, test_paste_loader_reuses_file_parsing_order, test_paste_controls_have_styles]:
        test()
        print(f"PASS {test.__name__}")
