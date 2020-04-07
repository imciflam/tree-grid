const GENERIC_REPORT = {
  Entity: {
    Fields: {
      Attribute: [
        {
          _Name: "GenericReportID",
          _Index: "3040004",
          _Type: "guid",
          _Description: "Идентификатор"
        },
        {
          _Name: "Name",
          _Index: "3040005",
          _Type: "string",
          _Description: "Наименование",
          _CharacterMaximumLength: "128",
          _Required: "1"
        },
        {
          _Name: "Filter",
          _Index: "3040012",
          _Type: "text",
          _Description: "Фильтр"
        },
        {
          _Name: "UseCustomGenerator",
          _Index: "3040015",
          _Type: "bool",
          _Description: "Использование спец. генератора",
          _Required: "1"
        }
      ],
      Parent: {
        _Name: "Entities",
        _Index: "3040009",
        _Description: "Сущность метаданных",
        _Type: "VCLib.ENTITIES",
        _Required: "1"
      },
      Child: [
        {
          _Name: "GeneratorParams",
          _Index: "3040011",
          _Type: "VCLib.GENERATOR_PARAMS",
          _Description: "Параметры генератора",
          _ChildAttribute: "GenericReport"
        },
        {
          _Name: "GeneratorLinks",
          _Index: "3040016",
          _Type: "VCLib.GENERATOR_LINK",
          _Description: "Используемые генераторы",
          _ChildAttribute: "GenericReport"
        },
        {
          _Name: "GenericReportFunctions",
          _Index: "3040017",
          _Type: "VCLib.GENERIC_REPORT_FUNCTION",
          _Description: "Функции",
          _ChildAttribute: "GenericReport"
        }
      ]
    },
    _Schema: "VCLib",
    _Name: "GENERIC_REPORT",
    _Description: "Обобщенная сущность ",
    _PrimaryKey: "GenericReportID",
    _DNAttributes: "{Name}",
    _DisplayName: "{0}"
  }
};

export default GENERIC_REPORT;
