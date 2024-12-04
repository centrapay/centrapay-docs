class Api {
  constructor(props) {
    this.make = props.make;
    this.model = props.model;
    this.color = props.color;
    this.engineType = props.engineType;
  }

  static create(builder) {
    return new Api({
      make: builder.make,
      model: builder.model,
      color: builder.color,
      engineType: builder.engineType,
    });
  }
}

class ApiBuilder {
  constructor() {
    this.make = '';
    this.model = '';
    this.color = '';
    this.engineType = '';
  }

  setMake(make) {
    this.make = make;
    return this;
  }

  setModel(model) {
    this.model = model;
    return this;
  }

  setColor(color) {
    this.color = color;
    return this;
  }

  setEngineType(engineType) {
    this.engineType = engineType;
    return this;
  }

  build() {
    return new Api.create(this);
  }
}

export { ApiBuilder };
