using FluentMigrator;

namespace Persistence.Migrations
{
  [Migration(20240726011500)]
  public class InitialCreateActivities : Migration
  {
    public override void Up()
    {
      Create.Table("Activities")
        .WithColumn("ID").AsString().PrimaryKey()
        .WithColumn("Title").AsString()
        .WithColumn("Date").AsString()
        .WithColumn("Description").AsString()
        .WithColumn("Category").AsString()
        .WithColumn("City").AsString()
        .WithColumn("Venue").AsString();
    }

    public override void Down()
    {
      Delete.Table("Activities");
    }
  }
}