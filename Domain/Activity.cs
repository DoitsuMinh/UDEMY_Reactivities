using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Activity
    {
        public Guid ID { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
        public string Status { get; set; } = "current";
    }
}