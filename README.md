# noslopUI Skills

Agent skills for [noslopUI](https://noslopui.com): hand-crafted UI blocks, Motion Lab effects and 280+ portable design systems in the [DESIGN.md format](https://github.com/google-labs-code/design.md), served to your coding agent over MCP.

The `noslopui` skill teaches an agent (Claude Code, Cursor, Codex, VS Code, Windsurf, OpenCode, Antigravity, Devin and any other MCP client) how to build a UI that doesn't look AI-generated: choose one design system, restyle every component to it, search the catalog before hand-building a section, and keep the user's brand inside the system's rules.

| Skill | What it does |
|---|---|
| [`noslopui`](skills/noslopui/SKILL.md) | Builds landing pages, dashboards and marketing sites from a noslopUI collection or a chosen design system, instead of default LLM output. |

## Install

The fastest way sets up the MCP server **and** this skill for every agent it finds:

```bash
npx noslopui@latest init
```

To add only the skill:

```bash
npx skills add noslopUI/skills
```

Or copy [`skills/noslopui/SKILL.md`](skills/noslopui/SKILL.md) into your agent's skills folder (for Claude Code: `~/.claude/skills/noslopui/SKILL.md`).

The skill uses the noslopUI MCP server at `https://noslopui.com/api/mcp`. Setup steps for each agent: [noslopui.com/mcp](https://noslopui.com/mcp).

## Where this file comes from

`skills/noslopui/SKILL.md` is a mirror. The source lives on the website and is served at [noslopui.com/skill/SKILL.md](https://noslopui.com/skill/SKILL.md). It's the same text the MCP server sends as its instructions on every connection. A [daily workflow](.github/workflows/sync.yml) pulls it and commits any change, so please don't open pull requests against the file itself. Suggestions are welcome as issues.

## Links

- Catalog: [noslopui.com](https://noslopui.com)
- Design systems: [noslopui.com/design-systems](https://noslopui.com/design-systems)
- Motion Lab: [noslopui.com/motion-lab](https://noslopui.com/motion-lab)
- CLI: [noslopUI/cli](https://github.com/noslopUI/cli)

## License

MIT. The skill text is MIT; the catalog it connects to is noslopUI's own and governed by [its terms](https://noslopui.com/terms).
