Rule #0: Long-term maintainability above short-term convenience.
Extend, don't replace.
Never hardcode gameplay content.
Preserve existing UI/CSS unless instructed otherwise.
All content is data-driven.
Prefer composition over inheritance where it reduces coupling.
Never remove features without explicit approval.
Maintain backward-compatible save files.
Keep files focused and reasonably sized.
Update documentation whenever architecture changes.
At the completion of every milestone, the project must remain in a fully playable and buildable state.

A milestone is not complete unless:

• The project compiles without errors.
• The game launches successfully.
• Existing gameplay continues functioning unless explicitly approved otherwise.
• New systems integrate without breaking previous systems.
• All documentation is updated.
• MILESTONES.md is updated.
• PROMPT_INDEX.md is updated.
• Any new developer tools are documented.
• Technical debt introduced during the milestone is recorded.

Every milestone should represent a clean Git commit.

The repository should always be capable of being released or restored to any completed milestone.

Large unfinished refactors are prohibited.

Never leave the repository in a partially broken state.