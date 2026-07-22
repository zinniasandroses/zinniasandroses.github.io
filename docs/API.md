# API Reference

## Core modules
- EventBus: publish/subscribe communication bus
- SaveSystem: versioned local save wrapper
- TimeSystem: shared time progression model
- Registry: content validation and lookup
- ContentLoader: content scan and registration pipeline
- SimulationManager: orchestration entry point

## Event contract
The simulation emits domain events through the common EventBus interface.

## Save contract
Save payloads should include a schemaVersion field and stable serialized data.

## Extension rule
New systems should expose small interfaces and should not directly depend on DOM code.
